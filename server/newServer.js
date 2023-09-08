require('dotenv').config()
const path = require('path');
const axios = require('axios');
const express = require('express');
const app = express();

//from originial server
var compression = require('express-compression')
const {questionRouter, postQuestionsRoute, addQuestion, updateAnswer, updateHelpful} = require('./loadCSV.js');
const {reportAnswer, reportQuestion} = require('./questionRoutes.js')
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

//Amelia's section
app.use('/reviews', reviewsRouter);

//--------------------------------------------------------------------------------------

//Victor's section
app.put("/helpful/:question_id", (req,res) => {
  console.log('updateHelpful')
  updateHelpful(req)
})

app.put("/helpful/:answer_id/answer", (req,res) => {
  console.log('update answer');
  updateAnswer(req)
})

app.post("/questions/:question_id" , (req, res) => {
  console.log('postquest');
  postQuestionsRoute(req)
  console.log('finished call')
})

app.get("/questions/:product_id", (req,res) => {
  //console.log('question Route')
  questionRouter(req).then((result) => {
    //console.log(result)
    res.send(result)
  })
  //console.log('res sent');
})

app.post("/addQuestion/:product_id", (req,res) => {
  console.log('add question');
  addQuestion(req)
  console.log('finished');
})

app.put("/reportQuestion/:question_id", (req,res) => {
  console.log('report quesiton');
  reportQuestion(req)
})

app.put("/reportAnswer/:answer_id", (req,res) => {
  console.log('report answer');
  reportAnswer(req)
})

// this is Ratings & Reviews section
app.use('/reviews', reviewsRouter);


//-------------------------------------------------------------------------------------
// Heith section

//View Images
app.get('/api/images', (req, res) => {
  const requestOptions = {
    headers: {
      Authorization: process.env.TOKEN,
    }
  };

  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37315/styles', requestOptions)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/product', (req, res) => {
  const requestOptions = {
    headers: {
      Authorization: process.env.TOKEN,
    }
  };

  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37315', requestOptions)
  .then(response => {
    res.json(response.data);
  })
    .catch(error => {
      console.error('Error fetching product info:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

//-------------------------------------------------------------------------------------------

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  }
});


module.exports = app; // for testing