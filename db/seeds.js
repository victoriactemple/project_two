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
const UserModel = Schema.UserModel

GardenModel.remove({}, function (err) {
    console.log(err);
});

UserModel.remove({}, function (err) {
    console.log(err);
});


//Create a Garden
const gardenPath = new GardenModel({name: "Victoria's Garden", country: "USA"})

// Create some Plants

const basil = new PlantModel({
    name: "Basil",
    description: "Cousin of catnip, basil grows well by tomatoes and is an excellent topping on everything from pasta to stirfry",
    img: "/images/basil.jpg",
    price: 3,
    edible: true
})

const dill = new PlantModel({
    name: "Dill",
    description: "Technically a weed",
    img: "/images/dill.jpg",
    price: 3,
    edible: true
})

const thyme = new PlantModel({
    name: "Thyme",
    description: "Aromatic perennial evergreen herb with culinary, medicinal, and ornamental uses",
    img: "/images/thyme.jpg",
    price: 3,
    edible: true
})


const chives = new PlantModel({
    name: "Chive",
    description: "Excellent on a baked potato if that's your thing",
    img: "/images/chives.jpg",
    price: 3,
    edible: true
})

const arugala = new PlantModel({
    name: "Arugala",
    description: "My favorite green when paired with beets and goat cheese",
    img: "/images/arugala.jpg",
    price: 3,
    edible: true
})

const mint = new PlantModel({
    name: "Mint",
    description: "A multitude of varieties -- peppermint, spearmint, chocolate-mint even",
    img: "/images/mint.jpg",
    price: 3,
    edible: true
})

const rosemary = new PlantModel({
    name: "Rosemary",
    description: "Smashing when cooked with potatoes and often used both in the herb garden and for landscaping",
    img: "/images/rosemary.jpg",
    price: 1,
    edible: true
})



const sage = new PlantModel({
    name: "Sage",
    description: "Thick herb that shouldn't be eaten on it's own unless it's been cooked in butter",
    img: "/images/sage.jpg",
    price: 3,
    edible: true
})


const bayleaf = new PlantModel({
    name: "Bay Leaf",
    description: "Much like sage, bay leaves are create for cooking, but shouldn't be eated raw",
    img: "/images/bayleaf.jpg",
    price: 3,
    edible: true
})

const taragon = new PlantModel({
    name: "Taragon",
    description: "Goes great in a mushroom omelette",
    img: "/images/taragon.jpg",
    price: 2,
    edible: true
})

const parsley = new PlantModel({
    name: "Parsley",
    description: "Used most often as a garnish, parsley is mild and earthy in flavor and is the star of tabouli salad",
    img: "/images/parsley.jpg",
    price: 2,
    edible: true
})

const marjoram = new PlantModel({
    name: "Marjoram",
    description: "Marjoram has a sweet pine and citrus flavor.",
    img: "/images/marjoram.jpg",
    price: 2,
    edible: true
})

// const chervil = new PlantModel({
//     name: "Chervil",
//     description: "Cervil..don't know. Looks like it would hur going down.",
//     img: "/images/genericplant_chervil.jpg",
//     price: 2,
//     edible: true
// })


// Create some users
const erica = new UserModel({
    name: "Erica"
})

const alex = new UserModel({
    name: "Alex"
})

const roger = new UserModel({
    name: "Roger"
})


const users = [erica, alex, roger]
const gardens =[gardenPath]
const plants = [basil, dill, thyme, mint, sage, bayleaf, taragon, marjoram, chives, arugala, rosemary, parsley]


// Saving the users
erica.save()
alex.save()
roger.save()


// Saving the garden

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

