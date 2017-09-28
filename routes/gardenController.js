const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js")
const GardenModel = Schema.GardenModel


//INDEX ROUTE

router.get('/', (req, res) => {
    // res.send("You're on the Garden Page Now")
    GardenModel.find({})
    .then((gardens) =>{
        res.render('gardens/index', {
            gardens: gardens
        })
    })
    .catch((error) => {
        console.log(error)
    })

})

module.exports = router