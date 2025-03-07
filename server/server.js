const express = require('express'); //Express is server
const mongoose = require('mongoose'); //Mongoose is a library that helps us interact with MongoDB, tools to use

require('dotenv').config(); //dotenv is a library that helps us read environment variables from a .env file
const CoffeeRecipe = require('./models/CoffeeRecipe'); //importing the CoffeeRecipe model

const app = express(); //creating an express app, different server functionalities 
const port = process.env.PORT || 3000; //setting the port , different channels

app.use(express.json()); // makes it understand json

mongoose.connect(process.env.MONGODB_URI) // connecting to the database - hidden for security
    .then(() => {
        console.log('Connected to MongoDB'); // if it connects, it will log this
    })
    .catch((err) => {
        console.log(err); // if it doesn't connect, it will log the error
    });


app.get('/api/coffee-recipes', async (req, res) => {
    const coffeeRecipes = await CoffeeRecipe.find();
    res.send(coffeeRecipes);
}); // get request to get all the coffee recipes from database

app.post('/api/coffee-recipes', async (req, res) => {
    const coffeeRecipe = new CoffeeRecipe({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });
    await coffeeRecipe.save();
    res.send(coffeeRecipe);
}); // post request to add a coffee recipe to the database, creates a new document

app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
}); // server is listening on the port, and logs that it is running on that port

