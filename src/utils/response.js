const successObj = res => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers":
        "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(res),
  }
}

const errObj = err => {
  console.log("error=>>", err)
  return {
    statusCode: err.statusCode,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ message: err.msg }),
  }
}
module.exports = { errObj, successObj }
