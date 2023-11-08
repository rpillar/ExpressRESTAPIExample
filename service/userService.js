const API = require('../utils/apiAuth');
const Users = require('../utils/initialData').users

/*
  Create a new User
*/
exports.createUser = (userName) => {
    // check whether the user already exists
    let user = Users.find((user) => user.username == userName)
    if (user) {
        return user;
    }

    // new user
    let today = new Date().toISOString().split('T')[0];
    user = {
      _id: Date.now(),
      api_key: API.genAPIKey(),
      username: userName,
      usage: [{ date: today, count: 0 }],
    };
  
    Users.push(user);
    return user;
};

/*
  Find a User - by Id
*/
exports.findUserById = (userId) => {
    let user = Users.find((user) => user._id == userId)
    
    return user
};

/*
  Find a User - by username
*/
exports.findUserByName = (userName) => {
    let user = Users.find((user) => user.name == userName)
    
    return user
};