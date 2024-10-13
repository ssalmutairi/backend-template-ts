#!/bin/bash

# This script extracts unique package URLs from npm ls, checks if they already exist,
# and if not, downloads them to the 'packages' directory.

# Get all package URLs
urls=$(npm ls --all --json | grep -Eo "(http|https)://[@a-zA-Z0-9./?=_%:-]*" | sort -u)

platform_urls=$(npm ls --all --json | jq -r '
  .dependencies[]? as $dep |
  ($dep.dependencies // {}) |
  to_entries[] |
  select(
    (.key | test("darwin-x64|darwin-arm64|linux-x64|win32-x64"))
  ) |
  "https://registry.npmjs.org/" + .key + "/-/" + (.key | split("/") | last) + "-" + 
  (
    .value.version // $dep.version
  ) + ".tgz"
' | sort -u)

# Combine the results
urls="$urls"$'\n'"$platform_urls"

# remove duplicates
urls=$(echo "$urls" | sort -u)

# Create the 'packages' directory if it does not exist
mkdir -p packages

# Download each package if it does not already exist
for url in $urls; do
  filename=$(basename "$url")
  
  # Check if the file already exists in the 'packages' directory
  if [ ! -f "packages/$filename" ]; then
    wget -P packages "$url"
  else
    echo "Package $filename already exists, skipping download."
  fi
done

# Remove any '.tgz' files that were accidentally downloaded
find packages -name "*.tgz.*" -exec rm {} \;

# Archive the 'packages' directory
tar cf packages.tar packages