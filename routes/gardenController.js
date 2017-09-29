const express = require('express')
const router = express.Router({mergeParams: true})


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


// CREATE a Garden Route??

// router.post('/', (req, res) => {
//     // GRAB the company ID from the parameters
//     const gardenId = req.params.gardenId

//     // GRAB the new plant info from the request body
//     const newPlant = req.body

//     //USE the GardenModel to find the Garden by ID
//     GardenModel.findById(gardenId)
//     .then((garden) => {
//         //THEN once you have found the garden from the database
//         // PUSH the new snowboard object into the Garden's
//         // plant array

//         garden.plants.push(newPlant)
//         return garden.save()
//     })
//     .then((garden) => {
//         // THEN once the garden has been saved, 
//         //Redirect to the Plants index for that garden
//         res.redirect(`/gardens/${gardenId}/plants`)
//     })
//     .catch((error => {
//         console.log(error)
//     }))
// })


// EDIT Route 

router.get('/:gardenId/edit', (req, res) => {

    const gardenId = req.params.gardenId

    GardenModel.findById(gardenId)
    .then((company) => {
        res.render('gardens/edit')
    })
})


// SHOW A PLANT THS IS WORKING

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