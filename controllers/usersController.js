/*
 * To generate JSDoc - ./node_modules/.bin/jsdoc usersController.js
*/

const API   = require('../utils/apiAuth');
const Users = require('../utils/initialData').users

/* 
  GET user data
*/
exports.get_users = (req, res) => {
    let u = Users.find((user) => user._id == req.userId)
    res.send(u); 
};

/*
  POST users
*/
exports.create_user = (req, res) => {
  let username = req.body.username;
  let user = _createUser(username, req);

  res.status(201).send({ data: user });
};

/*
  Private methods
  ===============
*/

/*
  Create a new User
*/
const _createUser = (_username, req) => {
    let today = new Date().toISOString().split('T')[0];
    let user = {
      _id: Date.now(),
      api_key: API.genAPIKey(),
      username: _username,
      usage: [{ date: today, count: 0 }],
    };
  
    Users.push(user);
    return user;
};