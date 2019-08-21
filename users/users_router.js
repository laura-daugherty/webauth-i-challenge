const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users_model.js');
const restricted = require('../auth/auth_model')


const router = express.Router();

//make restricted
router.get('/', restricted, (req, res) => {
  Users.getUsers()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => res.send(err)) 
});


router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
  .then(saved => {
    res.status(200).json(saved)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

router.post('/login', (req, res) => {
  let {username, password} = req.body

  Users.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.movie = "Man with a pillow for a face"; //can save whatever I want to the session?
      req.session.username = user.username; //only after a successful login
      res.status(200).json({message: `Welcome ${user.username}`})
    } else {
      res.status(500).json(error)
    }  
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    res.status(200).json({ bye: 'Laura'})
  })
})

// router.post('/hash', (req, res) => {
//   const password = req.body.password;
//   //hash the password
//   const hash = bcrypt.hashSync(password, 8);
//   res.status(200).json({ password, hash })
// })

module.exports = router;
