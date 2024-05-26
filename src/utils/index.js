const { errObj, successObj } = require("./response.js");
const { getPrismaClient } = require("./prismaClientGetter.js");
const { wrapErrorObj, errorResponse } = require("./errorResponse.js");

module.exports = {
  errObj,
  successObj,
  getPrismaClient,
  wrapErrorObj,
  errorResponse,
};
