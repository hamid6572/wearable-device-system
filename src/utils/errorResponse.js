const errorResponse = (statusCode, message) => {
  let error = new Error()
  error.statusCode = statusCode
  error.errMsg = message
  return error
}

const wrapErrorObj = (error, defaultMessage) => {
  error.statusCode = error.statusCode || 500
  error.msg = error.errMsg || defaultMessage
  return error
}

module.exports = { errorResponse, wrapErrorObj };
