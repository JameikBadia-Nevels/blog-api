// Dependencies
require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection
const app = express();
const cors = require('cors')

// Environment Variables (getting ready for Heroku)
const mongoURI = process.env.MONGODB_URI 
const PORT = process.env.PORT 

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log('MongoDB connection established')
)

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file.
app.use(cors())
app.use(express.json())

// Routes
const postsController = require('./controllers/blog.js');
app.use('/blog', postsController);


app.listen(PORT, () => {
  console.log('Let\'s get this sheit! TOTM', PORT)
})