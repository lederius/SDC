const dotenv = require("dotenv")
dotenv.config()
const fs = require('fs')
const axios = require('axios');
const products = './server/products.csv';
const stream = fs.createWriteStream(products)
const { Pool } = require('pg')

const pool = new Pool({
  user:process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//works
questionRouter = (req, res) => {
  let product_id = req.params.product_id;
  // do a query to return all the question for this product
  const queryQuestion =
    `SELECT question_id, question_body, question_date, asker_name, question_helpfulness
    FROM Questions
    WHERE product_id = ${product_id}`;
  return new Promise(function(resolve, reject){
      pool.query(queryQuestion, (err, res) => {
        //console.log('running query', queryQuestion);
        if (err) {
          //console.error(err);
          return reject(err);
        }
        //console.log('final answer', res.rows);
        let result = {
          product_id: product_id,
          results: res.rows
        };
        resolve(result);
        //pool.end(); dont need because of pool query
      });
  })
};

//works
addQuestion = (req, res) => {
  //console.log('addQuestion req.params', req.params);
  //console.log('req.bdy', req.body)
  //verify on line 80 expected output
  req.body.product_id = Number(req.params.product_id);
  let question_body = req.body.body;
  let asker_name = req.body.name;
  let asker_email = req.body.email;
  let product_id = req.params.product_id;
  // do a query to return all the question for this product
  const queryQuestion =
  `INSERT INTO Questions (question_body, asker_name, asker_email, product_id)
  VALUES ('${question_body}', '${asker_name}', '${asker_email}', ${product_id})
  RETURNING *`
  return new Promise(function(resolve, reject){
    pool.query(queryQuestion, (err, res) => {
      console.log('running query', queryQuestion);
      if (err) {
        //console.error('!!!!!!!!!!!', err);
        reject(err);
      }
      console.log('final answer', res.rows[0]);
      //duplicate key error
      resolve(res);
    });
  })

};
//current
updateHelpful = (req,res) => {
  //increases helpful number
  //get helpful number
  //insert new helpful number
  let newNum;
  let question_id = req.params.question_id;
  //console.log('updateHelpful');
  const queryQuestion =
    `SELECT question_helpfulness
    FROM Questions
    WHERE question_id = ${question_id}`;
  return new Promise(function(resolve, reject){
    pool.query(queryQuestion, (err, res) => {
      if (err) {
        return reject(err);
      }
      //console.log('res', res.rows[0].question_helpfulness);
      newNum = res.rows[0].question_helpfulness + 1;
      //console.log('newNum before', newNum);
      const queryHelpfulness =
      // return newNum;
    });
    `INSERT INTO Questions (question_helpfulness)
    VALUES (${newNum})
    WHERE question_id = ${question_id}`
  pool.query(queryHelpfulness, (err, res) => {
    console.log('running query', queryHelpfulness);
    if (err) {
      reject(err);
    }
    console.log('res', res);
    resolve(res);
  });
  })
};

postQuestionsRoute = (req, res) => {
  //console.log('in postQuestroute');
    let question_body = req.body.body;
    let asker_name = req.body.name;
    let asker_email = req.body.email;
    let product_id = req.body.product_id;
    // do a query to return all the question for this product
    const queryQuestion =
    `INSERT INTO Questions (question_id, asker_name, asker_email, product_id)
    values (${question_body}, ${asker_name}, ${asker_email}, ${product_id})`
    return new Promise(function(resolve, reject){
      pool.query(queryQuestion, (err, res) => {
        //console.log('running query', query);
        if (err) {
          console.error('!!!!!!!!!!!', err);
          reject(err);
        }
        for (let row of res.rows) {
          //console.log('rows -->', row);
          //can do a query call wirh row.question_id
          //call for FK = row.question_id
          //if returns add key answers with values the return object
        }
        console.log('final answer', res.rows);
        resolve(res.rows);
        // pool.end();
      });
    })
};


reportQuestion = (req, res) => {
  console.log('reportQuestion');
  console.log('req.params', req.params);
const repQueUrl = postPath + req.params.question_id + "/report";

};

updateAnswer = (req , res) => {
  const answerHelpUrl = answerHelpPath + req.params.answer_id + "/helpful"
  axios.put(answerHelpUrl, "test", {
    headers: {
      'authorization': req.headers.authorization
    }
  }).then((result) => {

  }).catch((err) => console.error(err))
}

exports.questionRouter=questionRouter;
exports.postQuestionsRoute=postQuestionsRoute;
exports.addQuestion=addQuestion;
exports.updateAnswer=updateAnswer;
exports.updateHelpful=updateHelpful;