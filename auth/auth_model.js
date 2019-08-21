const bcrypt = require('bcryptjs')

const Users = require('../users/users_model');

module.exports = function restricted(req, res, next) {

  let {username} = req.session

  if(req.session && username) {
    next()
  } else {
    res.status(401).json({message: 'invalid credentials'})
  }
}

  //   Users.findBy({username})
  //   .first()
  //   .then(user => {
  //     if (user && bcrypt.compareSync(user, user.username)) {
  //       next();
  //     } else {
  //       res.status(401).json({message: "invalid credentials"})
  //     }  
  //   })
  //   .catch(error => {
  //     res.status(500).json(error)
  //   })
  // } else {
  //   res.status(400).json({message: "please enter username and password"})
  // }
  //}
