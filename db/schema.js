const mongoose = require('mongoose');

mongoose.Promise = global.Promise


// First we instantiate a namespace for the Schema constructor defined by mongoose
const Schema = mongoose.Schema;

// const User = new Schema ({
//     name: String,
//     email: String,
// })

const PlantSchema = new Schema ({
    name: {
        type: String,
        unique: true,
    },
    description: String,
    img: String, 
    price: Number,
    qty: Number
})


const GardenSchema = new Schema ({
    name: {
        type: String,
        unique: true
    },
    country: String,
    plants: [PlantSchema]

})

const UserSchema = new Schema({
    name: String,
})

const GardenModel = mongoose.model('Garden', GardenSchema)
const PlantModel = mongoose.model('Plant', PlantSchema)
const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    GardenModel: GardenModel,
    PlantModel: PlantModel,
    UserModel: UserModel

}