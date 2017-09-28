const express = require('express')
const router = express.Router()
// const router = express.Router({ mergeParams: true})

const Schema = require("../db/schema.js")
const PlantModel = Schema.PlantModel


//INDEX ROUTE

router.get('/', (req, res) => {
    res.send("You're on the Plant Page Now")
})







module.exports = router