const express = require('express');
const bcrypt = require('bcryptjs')

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

// router.get('/', (req, res) => {
//   let {username, password} = req.headers
//   Users.findBy({username})
//   .first()
//   .then(user => {
//     if (user && bcrypt.compare(password, user.password)) {
//       Users.getUsers()
//       .then(users => {
//         res.status(200).json(users)
//       })
//       .catch(err => {
//         res.status(500).json({message: "Big ole error"})
//       }) 
//     } else {
//       res.status(500).json("You're not authorized to do that")
//     }  
//   })
//   .catch(error => {
//     res.status(500).json(error)
//   })
// });


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
    if (user && bcrypt.compare(password, user.password)) {
      res.status(200).json({message: `Welcome ${user.username}`})
    } else {
      res.status(500).json(error)
    }  
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

router.post('/hash', (req, res) => {
  const password = req.body.password;
  //hash the password
  const hash = bcrypt.hashSync(password, 8);
  res.status(200).json({ password, hash })
})

module.exports = router;
