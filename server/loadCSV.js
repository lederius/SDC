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
//works
updateHelpful = (req,res) => {
  let question_id = req.params.question_id;
  //console.log('updateHelpful');
  const queryHelpfulness =
    `UPDATE Questions question_helpfulness
    SET question_helpfulness = question_helpfulness+1
    WHERE question_id = ${question_id}
    RETURNING question_helpfulness`;
  return new Promise(function(resolve, reject){
    pool.query(queryHelpfulness, (err, res) => {
      if (err) {
        return reject(err);
      }
      //console.log('res.rows[0]', res.rows[0]);
      resolve(res)
    });
  })
};
//works
postQuestionsRoute = (req, res) => {
  console.log('in postQuestroute');
    let answer_body = req.body.body;
    let answerer_name = req.body.name;
    let answerer_email = req.body.email;
    let question_id = req.params.question_id ;

    // INSERT INTO products (product_no, name, price)
    // SELECT product_no, name, price FROM new_products
    //   WHERE release_date = 'today';


    const queryPostQuestion =
    `INSERT INTO Answers (question_id, answer_body, answerer_name, answerer_email)
    VALUES (${question_id}, '${answer_body}', '${answerer_name}', '${answerer_email}')
    RETURNING *`;
    return new Promise(function(resolve, reject){
      pool.query(queryPostQuestion, (err, res) => {
        console.log('running queryPostQuestion!!!', queryPostQuestion);
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
        console.log('final answer', res.rows[0]);
        resolve(res);
        // pool.end();
      });
    })
};

//works
reportQuestion = (req, res) => {
  let question_id = req.params.question_id;
  console.log('reportQuestion');
  const queryReport =
    `UPDATE Questions reported
    SET reported = reported+1
    WHERE question_id = ${question_id}
    RETURNING reported`;
  return new Promise(function(resolve, reject){
    pool.query(queryReport, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log('res.rows[0]', res.rows[0]);
      resolve(res)
    });
  });

};
//works
reportAnswer = (req,res) => {
  let answer_id = req.params.answer_id;
  console.log('reportAnswer');
  const queryAnswerReport =
    `UPDATE Answers reported
    SET reported = reported+1
    WHERE answer_id = ${answer_id}
    RETURNING reported`;
  return new Promise(function(resolve, reject){
    pool.query(queryAnswerReport, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log('res.rows[0]', res.rows[0]);
      resolve(res)
    });
  });
}
//works
updateAnswer = (req , res) => {
  let answer_id = req.params.answer_id;
  console.log('updateAnswerHelpful');
  const queryAnswerHelpfulness =
    `UPDATE Answers answer_helpfulness
    SET answer_helpfulness = answer_helpfulness+1
    WHERE answer_id = ${answer_id}
    RETURNING answer_helpfulness`;
  return new Promise(function(resolve, reject){
    pool.query(queryAnswerHelpfulness, (err, res) => {
      if (err) {
        return reject(err);
      }
      //console.log('res.rows[0]', res.rows[0]);
      resolve(res)
    });
  })
}



exports.questionRouter=questionRouter;
exports.postQuestionsRoute=postQuestionsRoute;
exports.addQuestion=addQuestion;
exports.updateAnswer=updateAnswer;
exports.updateHelpful=updateHelpful;
exports.reportQuestion=reportQuestion;