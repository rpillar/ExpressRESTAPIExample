const API = require('../utils/apiAuth');
const Users = require('../utils/initialData').users

/*
  Create a new User
*/
exports.createUser = (_username) => {
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

/*
  Find a User
*/
exports.findUser = (userId) => {
    let user = Users.find((user) => user._id == userId)
    
    return user
};