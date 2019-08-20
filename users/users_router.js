const express = require('express');

const Users = require('./users_model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Users.getUsers()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: "Big ole error"})
  }) 
});

module.exports = router;
