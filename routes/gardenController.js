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

// NEW PLANT ROUTE

router.get('/new', (req, res) => {
    res.render('gardens/new')
})




// SHOW A PLANT

router.get('/:plantId', (req, res) => {
    const gardenId = req.params.gardenId

    const plantId = req.params.plantId

    GardenModel.findOne(gardenId)
    .then((garden) => {
        const plant = garden.plants.id(plantId)

        res.render('plants/show', {
            plant: plant,
            garden: garden
        })
    })
    .catch((error) => {
        console.log(error)
    })
})




module.exports = router