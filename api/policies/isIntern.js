var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  sails.log('IS INTERN ?')
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, sails.config.TOKEN_SECRET);

  if (payload.exp <= Date.now()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  sails.log(payload.data);
  if(payload.data.intern ===true)
  {
      req.user = payload.sub;
      next();
  }

};
