const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js")
const GardenModel = Schema.GardenModel;


//INDEX ROUTE

router.get('/', (req, res) => {
    res.send
})