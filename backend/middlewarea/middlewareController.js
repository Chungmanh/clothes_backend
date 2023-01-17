const jwt = require("jsonwebtoken");
const secretkey = require("../_config/JWT_ACCESS_KEY");

exports.checklogiṇ = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, secretkey, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
  next();
};
