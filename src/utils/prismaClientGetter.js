// import { createRequire } from "module";
const { PrismaClient } = require ('@prisma/client')

module.exports.getPrismaClient = async () => {
  return new PrismaClient();
};
