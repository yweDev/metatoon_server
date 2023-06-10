// Module to identify user
const jwt = require('jsonwebtoken');

exports.identify = async (ctx, next) => {
  var token = ctx.request.headers['token']
  await jwt.verify(token, process.env.APP_KEY, async  (error, decoded) => {
    if(error) {
      // Temporary data for user who didn't log in
      const anonData = { id: -9, ip: ctx.request.ip };
      ctx.request.user = anonData;
    } else {
      ctx.request.user = decoded;
    }
    await next();
  })
}
