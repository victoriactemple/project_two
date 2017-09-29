const express = require('express')
const router = express.Router()
// const router = express.Router({ mergeParams: true})

const Schema = require("../db/schema.js")
const PlantModel = Schema.PlantModel


//INDEX ROUTE

router.get('/', (req, res) => {
    res.send("You're on the Plant Page Now")
})

// 


// NEW PLANT 

router.get('/new', (req, res) => {
    const gardenId = req.params.gardenId

    res.render('plants/new', {
        gardenId: gardenId
    })
})


// CREATE ROUTE:
router.post('/', (req, res) => {
    // GRAB the company ID from the parameters
    const gardenId = req.params.gardenId

    const plantId = req.params.plantId

    // GRAB the new plant info from the request body
    const newPlant = req.body

    //USE the GardenModel to find the Garden by ID
    GardenModel.findById(gardenId)
    .then((garden) => {
        //THEN once you have found the garden from the database
        // PUSH the new snowboard object into the Garden's
        // plant array

        garden.plants.push(newPlant)
        return garden.save()
    })
    .then((garden) => {
        // THEN once the garden has been saved, 
        //Redirect to the Plants index for that garden
        res.redirect(`/gardens/${gardenId}/plants`)
    })
    .catch((error => {
        console.log(error)
    }))
})


module.exports = router