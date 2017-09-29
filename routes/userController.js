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
  const userId = req.params.userId

  res.render('users/new', {
    userId: userId
  })
})

// SHOW PAGE





// CREATE User Route

router.post('/', (req, res) => {
const userId = req.params.userId
const newUser = req.body

UserModel.findById(userId)
.then(() => {
  user.users.psuh(newUser)

  return user.save()

})

})




module.exports = router;
