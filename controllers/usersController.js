/*
 * To generate JSDoc - ./node_modules/.bin/jsdoc usersController.js
*/

const UserService = require('../service/userService')

/* 
  GET user data
*/
exports.get_users = (req, res) => {
    let u = UserService.findUserById(req.userId)
    res.send(u); 
};

/*
  POST users
*/
exports.create_user = (req, res) => {
  let username = req.body.username;
  let user = UserService.createUser(username);

  res.status(201).send({ data: user });
};