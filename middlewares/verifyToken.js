// const jwtDecode = require('jwt-decode');
const Role = require("../models/roles")
const Users = require("../models/users")
const jwt = require('jsonwebtoken')

// const logger = require('../middlewares/logger');


module.exports = {
  async verifyToken(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
      // logger.info(`No Token Provided`);
      return res.status(403).send({ message: 'No token provided.' });
    }

    const token = header.split(' ')[1];
    try {
      // const decoded = jwtDecode(token);
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      // Check if the token is expired
      // if (Date.now() >= decoded.exp * 1000) {
      // //   logger.info(`Token Expired`);
      //   return res.status(401).send({ message: 'Token expired.' });
      // }
      const user = await Users.findById(decoded._id).select({'first_name' : 1 , 'role_ID': 1}).exec();
      const role = await Role.findById(user.role_ID).select('role_name').exec();
      req.userId = decoded._id;
      req.roleName = role.role_name;
      req.userName = user.first_name;
      next();
    } catch (err) {
      // logger.error(`Unauthorized - ${err}`);
      console.log(err , "error")
      return res.status(401).send({ message: 'Unauthorized.' });
    }
  }

}

// module.exports = verifyToken;