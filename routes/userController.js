var express = require('express');
var router = express.Router({ mergeParams: true });

const Schema = require("../db/schema.js")
const UserModel = Schema.UserModel


/* GET users listing. */

//INDEX
router.get('/', (req, res) => {

  // res.send("You're hit the user's index")
  //find all users in database 
  UserModel.find({})
    .then((users) => {
      res.render("users/index", {
        users: users
      })
    })
    .catch((error) => {
      console.log(error)
    })
})


// NEW USER

router.get('/new', (req, res) => {

  //RENDER an empty from for the new user
  res.render('users/new', {

  })
})



// CREATE User Route

router.post('/', (req, res) => {
  // GRAB the new user info as a JS object from the req bosy
  const newUser = req.body

  UserModel.create(newUser)
    .then(() => {

      //THEN once the model has been saved, redirect to the USERS index
      res.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })

})


//EDIT User

router.get('/:userId/edit', (req, res) => {
  const userId = req.params.userId

  UserModel.findById(userId)
  .then((users) => {
    res.render('users/edit', {
      users: users
    })
  })
  .catch((error) => {
    console.log(error)
  })

})


// UPDATE Route

router.put('/:userId', (req, res) => {
  const userId = req.params.userId

  const updatedUser = req.body

  UserModel.findByIdAndUpdate(userId, updatedUser, {new: true})
  .then(() => {
    res.redirect(`/users/${userId}`)
  })
  .catch((error) => {
    console.log(error)
  })

})


// SHOW route 

router.get('/:userId', (req, res) => {
    const userId = req.params.userId
    
    UserModel.findById(userId)
    .then((users) => {
      res.render('users/show', {
        users: users
      })
    })
    .catch((error) => {
      console.log(error)
    })
}) 

// DELETE User Route

router.get('/:userId/delete', (req, res) => {
  const userId = req.params.userId

  UserModel.findByIdAndRemove(userId)
  .then(() => {
    res.redirect('/users')
  })
  .catch((error) => {
    console.log(error)
  })
})


module.exports = router;
