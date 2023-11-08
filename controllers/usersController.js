/*
 * To generate JSDoc - ./node_modules/.bin/jsdoc usersController.js
*/

const UserService = require('../service/userService')

/* 
  GET user data
*/
exports.get_users = (req, res) => {
    let users = UserService.findUserById(req.userId)
    res.send(users); 
};

/*
  POST users
*/
exports.create_user = (req, res) => {
  let username = req.body.username;
  let user = UserService.createUser(username);

  res.status(201).send(user);
};