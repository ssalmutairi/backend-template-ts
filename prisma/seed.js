require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const argon2 = require("argon2");
const prisma = new PrismaClient();
const { v4: uuid } = require("uuid");
const hashPassword = async (password) => {
  return await argon2.hash(password);
};
let found = null;
const userSeed = async () => {
  const plainPassword = "123456";
  const password = await hashPassword(plainPassword);
  const admin = {
    name: "administrator",
    username: "admin",
    password,
    deletedAt: null,
  };
  const users = [admin];

  for (const user of users) {
    found = await prisma.user.findFirst({ where: { username: user.username } });
    if (!found) {
      const newUser = await prisma.user.create({ data: user });
      console.log(`created account username: ${newUser.username} and password: ${plainPassword}`);
    }
  }
};

async function main() {
  await Promise.all([userSeed()]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
