const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js")
const GardenModel = Schema.GardenModel


//INDEX ROUTE

router.get('/', (req, res) => {
    // res.send("You're on the Garden Page Now")
    GardenModel.findOne({})
    .then((garden) =>{
        console.log(garden.plants)
        res.render('gardens/index', {
            garden: garden
        })
    })
    .catch((error) => {
        console.log(error)
    })

})

module.exports = router