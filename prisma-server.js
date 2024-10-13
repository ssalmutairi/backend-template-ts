const express = require("express");
const { mkdirSync } = require("fs");
const path = require("path");
const app = express();
const execSync = require("child_process").execSync;
const port = 3000;

// Serve the files dynamically from the binaries folder
app.get("/download/all_commits/:commit/:platform/:file", (req, res) => {
  console.log(req.params);
  const { commit, platform, file } = req.params;

  // Build the file path based on commit and platform
  const directoryPath = path.join(__dirname, "binaries", "all_commits", commit, platform);
  mkdirSync(directoryPath, { recursive: true });
  const filePath = path.join(directoryPath, file);
  //create the directory if it does not exist

  // Send the file if it exists
  res.download(filePath, (err) => {
    if (err) {
      // try download from original source if not found
      execSync(`wget https://binaries.prisma.sh/all_commits/${commit}/${platform}/${file} -O ${filePath}`);
      res.status(404).send("File not found");
    }
  });
});

// fetch all files by commit id
app.get("/fetch/:commit", async (req, res) => {
  const { commit } = req.params;
  const directoryPath = path.join(__dirname, "binaries", "all_commits", commit);
  const platforms = ["darwin", "darwin-arm64", "linux-musl-openssl-3.0.x", "windows"];
  const files = [
    "libquery_engine.dylib.node.gz",
    "libquery_engine.dylib.node.gz.sha256",
    "libquery_engine.dylib.node.sha256",
    "libquery_engine.so.node.gz",
    "libquery_engine.so.node.gz.sha256",
    "libquery_engine.so.node.sha256",
    "query_engine.dll.node.gz",
    "query_engine.dll.node.gz.sha256",
    "query_engine.dll.node.sha256",
    "query-engine.gz",
    "query-engine.gz.sha256",
    "schema-engine.gz",
    "schema-engine.gz.sha256",
    "schema-engine.sha256",
  ];

  // generate directories for all platforms

  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    const platformDirectory = path.join(directoryPath, platform);
    mkdirSync(platformDirectory, { recursive: true });
  }

  // download all files for all platforms
  // check if file exists before downloading and ignore error if file not found
  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const filePath = path.join(directoryPath, platform, file);
      try {
        // check if file exists before downloading and ignore error if file not found
        if (execSync(`[ -f ${filePath} ] && echo "1" || echo "0"`).toString().trim() === "1") {
          continue;
        }
        execSync(`wget -q -b https://binaries.prisma.sh/all_commits/${commit}/${platform}/${file} -O ${filePath}`);
      } catch (e) {
        console.log(`Error downloading file: ${filePath}`);
      }
    }
  }

  res.send("Files downloaded successfully for commit: " + commit);
});

// Default route for the homepage
app.get("/", (req, res) => {
  res.send("Welcome to the binary download server!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
