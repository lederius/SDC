require('dotenv').config()
const path = require('path');
const axios = require('axios');
const express = require('express');
const app = express();

//from originial server
var compression = require('express-compression')
const {questionRouter, postQuestionsRoute, updateHelpful, updateAnswer, addQuestion , reportAnswer, reportQuestion} = require('./questionRoutes.js')
const bodyParser = require('body-parser');
const basePath = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const reviewsRouter = require('./reviewsRoutes.js');


//

// Set up headers for API requests
let params = {
  headers: { Authorization: process.env.TOKEN }
};

// Set the port for the server to listen on
const port = 3000;// original port
//new port 9000

// Use compression middleware to compress responses
app.use(compression());

// Set up body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the client's 'dist' directory
app.use(express.static(path.join(__dirname, '..', '/client/dist')));



// Middleware to set authorization header
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    req.headers.authorization = process.env.TOKEN;
  }
  next();
});


app.use('/reviews', reviewsRouter);



app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  }
});
