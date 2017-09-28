require('dotenv').config();

// Database setup
var mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

const Schema = require("./schema.js")

const GardenModel = Schema.GardenModel
const PlantModel = Schema.PlantModel

GardenModel.remove({}, function (err) {
    console.log(err);
});
//Create a Garden
const gardenPath = new GardenModel({name: "Victoria's Garden", country: "USA"})

// Create some Plants

const basil = new PlantModel({
    name: "Basil",
    description: "Cousin of catnip, basil grows well by tomatoes and is an excellent topping on everything from pasta to stirfry",
    img: "https://foodartist.files.wordpress.com/2011/02/herb-basil.jpg",
    price: 3,
    edible: true
})

const dill = new PlantModel({
    name: "Dill",
    description: "Technically a weed",
    img: "https://foodartist.files.wordpress.com/2011/02/herb-basil.jpg",
    price: 3,
    edible: true
})

const chives = new PlantModel({
    name: "Chive",
    description: "Excellent on a baked potato if that's your thing",
    img: "http://www.sallypond.co.uk/wp-content/uploads/2016/05/chives-watermarked.jpg",
    price: 3,
    edible: true
})

const catnip = new PlantModel({
    name: "Catnip",
    description: "Your cats will love this herbal treat",
    img: "http://pfaf.org/Admin/PlantImages/NepetaCataria.jpg",
    price: 3,
    edible: true
})

const mint = new PlantModel({
    name: "Mint",
    description: "A multitude of varieties -- peppermint, spearmint, chocolate-mint even",
    img: "http://2.bp.blogspot.com/-ptorspDmdFI/UQWEomK6mEI/AAAAAAAAAFg/o69e4z09cvg/s1600/peppermint.png",
    price: 3,
    edible: true
})

const giantHogWeed = new PlantModel({
    name: "Giant Hog Weed",
    description: "Don't even touch it -- super poisonous and will end in a rash once touched and skin is exposed to sunlight",
    img: "https://foodartist.files.wordpress.com/2011/02/herb-basil.jpg",
    price: 1,
    edible: false
})

const gardens =[gardenPath]
const plants = [basil, dill, chives, catnip, mint, giantHogWeed]


gardens.forEach(garden => {
    garden.plants = plants

garden.save()
.then((garden) =>{
    console.log(`${garden.name} saved`)
})
.catch((error) =>{
    console.log(error)
})

})



//Disconnect from database
db.close();

