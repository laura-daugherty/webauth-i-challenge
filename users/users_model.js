const db = require('../data/db-config.js');

module.exports = {
  getUsers,
  add,
  findBy
};


function getUsers() {
  return db('users').select('id', 'username');
}

function add(user) {
  return db("users")
  .insert(user, "id")
}

function findBy({username}) {
  return db("users")
  .where({username})
}
