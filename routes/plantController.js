const express = require('express')
// const router = express.Router()
const router = express.Router({ mergeParams: true})

const Schema = require("../db/schema.js")
const PlantModel = Schema.PlantModel
const GardenModel = Schema.GardenModel


//INDEX ROUTE

router.get('/', (req, res) => {
    res.send("You're on the Plant Page Now")
})



// NEW PLANT 

// gardens/59cda8bc8407b32681aee2f2/plants/new

router.get('/new', (req, res) => {
    console.log(req.params)
    const gardenId = req.params.gardenId

    res.render('plants/new', {
        gardenId: gardenId
    })
})



// SHOW PAGE

router.get('/:plantId', (req, res) => {
    const gardenId = req.params.gardenId

    const plantId = req.params.plantId

    GardenModel.findById(gardenId)
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





// CREATE ROUTE:
router.post('/', (req, res) => {
    // GRAB the company ID from the parameters
    const gardenId = req.params.gardenId

    // const plantId = req.params.plantId

    // GRAB the new plant info from the request body
    const newPlant = req.body

    //USE the GardenModel to find the Garden by ID
    GardenModel.findById(gardenId)
    .then((garden) => {
        //THEN once you have found the garden from the database
        // PUSH the new plant object into the Garden's
        // plant array

        garden.plants.push(newPlant)

        //SAVE the garden
        return garden.save()
    })
    .then((garden) => {
        console.log(gardenId)
        // THEN once the garden has been saved, 
        //Redirect to the Plants index for that garden
        res.redirect(`/gardens`)
    })
    .catch((error) => {
        console.log(error)
    })
})

// EDIT ROUTE


router.get('/:plantId/edit', (req, res) => {
    const gardenId = req.params.gardenId

    const plantId = req.params.plantId

    GardenModel.findById(gardenId)
    .then((garden) => {
        const plant = garden.plants.id(plantId)

        res.render('plants/edit', {
            plant: plant,
            gardenId: gardenId
        })
    })
    .catch((error) => {
        console.log(error)
    })

})

// UPDATE Plant Route

router.put('/:plantId', (req, res) => {

    // GRAB the plant ID from the paramenters
    const gardenId = req.params.gardenId

    const plantId = req.params.plantId

    // GRAB the updated plant object from the req body
    const updatedPlant = req.body
    // console.log(updatedPlant)

    // USE the Garden Model to find the garden by ID
    GardenModel.findById(gardenId)
    .then((garden) => {
        //THEN Once the garden has been returned, 
        //FIND the snowboard by ID from the garden's plants
        const plant = garden.plants.id(plantId)

        // MAP each attribute from the updated plant object to 
        //the same attribute on the originl snowboard

        plant.name = updatedPlant.name
        plant.description = updatedPlant.description
        // plant.img = updatedPlant.img
        plant.price = updatedPlant.price
        plant.edible = updatedPlant.edible

        return garden.save()
    })

    .then(() => {
        res.redirect(`/gardens/${gardenId}/plants/${plantId}`)
    })
    .catch((error) => {
        console.log(error)
    })



    // DELETE

    router.get('/:plantId/delete', (req, res) => {
        
            // GRAB the garden ID from the parameters
            const gardenId = req.params.gardenId
            
            // GRAB the plant ID from the parameters
            const plantId = req.params.plantId
        
            // USE the gardenModel to find the garden by ID
            GardenModel.findById(gardenId)
                .then((garden) => {
                    // THEN once the garden has been returned,
                    // REMOVE the plants from the garden's plants array
                    const plant = garden.plants.id(plantId).remove()
        
                    // THEN save the garden and return the PROMISE
                    return garden.save()
                    console.log(plantId)
                })
                .then(() => {
                    // THEN once the garden has saved, redirect to the 
                    // garden's plantss INDEX page
                    res.redirect(`/gardens`)
                })
        })
        


})


module.exports = router