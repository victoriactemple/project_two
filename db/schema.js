const mongoose = require('mongoose');

// First we instantiate a namespace for the Schema constructor defined by mongoose
const Schema = mongoose.Schema;

const user = new Schema ({
    name: String,
    email: String,
})

const plantSchema = new Schema ({
    name: {
        type: String,
        unique: true,
    },
    decription: String,
    image: String, 
    price: Number,
    edible: Boolean
})


const gardenSchema = new Schema ({
    name: {
        type: String,
        unique: true
    },
    country: String,
    plants: [plantSchema]

})

const GardenModel = mongoose.model('Garden', GardenSchema)
const PlantModel = mongoose.model('Plant', PlantSchema)
const UserModel = mongoose.model('User', UserSchema)

model.exports = {
    GardenModel: GardenModel,
    PlantModel: PlantModel,
    UserModel: UserModel

}