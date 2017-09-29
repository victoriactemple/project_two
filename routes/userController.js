var express = require('express');
var router = express.Router({ mergeParams: true });

const Schema = require("../db/schema.js")
const UserModel = Schema.UserModel


/* GET users listing. */

//INDEX
router.get("/", (req, res) => {
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

// router.get('/new', (req, res) => {
//   const userId = req.params.userId

//   res.render('users/new', {
//     userId: userId
//   })
// })


module.exports = router;
