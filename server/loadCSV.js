const dotenv = require("dotenv")
dotenv.config()
const fs = require('fs')
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

questionRouter = (req, res) => {
  let product_id = req.params.product_id;
  // do a query to return all the question for this product
  const queryQuestion =
    `SELECT question_id, question_body, question_date, asker_name, question_helpfulness
    FROM Questions
    WHERE product_id = ${product_id}`;
  return new Promise(function(resolve, reject){
      pool.query(queryQuestion, (err, res) => {
        console.log('running query', queryQuestion);
        if (err) {
          //console.error(err);
          return;
        }
        for (let row of res.rows) {
          //console.log('rows -->', row);
          //can do a query call wirh row.question_id
          //call for FK = row.question_id
          //if returns add key answers with values the return object
        }
        console.log('final answer', res.rows);
        //pool.end(); dont need because of pool query
      });
  })
};

postQuestionsRoute = (req, res) => {
  console.log('in postQuestroute');
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
        console.log('running query', query);
        if (err) {
          console.error('!!!!!!!!!!!', err);
          return;
        }
        for (let row of res.rows) {
          console.log('rows -->', row);
          //can do a query call wirh row.question_id
          //call for FK = row.question_id
          //if returns add key answers with values the return object
        }
        console.log('final answer', res.rows);
        // pool.end();
      });
    })
};

addQuestion = (req, res) => {
  console.log('addQuestion req.params', req.params);
  console.log('req.bdy', req.body)
  //verify on line 80 expected output
  req.body.product_id = Number(req.params.product_id);
  let question_body = req.body.body;
  let asker_name = req.body.name;
  let asker_email = req.body.email;
  let product_id = req.params.product_id;
  // do a query to return all the question for this product
  const queryQuestion =
  `INSERT INTO Questions (question_id, question_body, asker_name, asker_email, product_id)
  VALUES (nextval('serial_question'), '${question_body}', '${asker_name}', '${asker_email}', ${product_id})`
  return new Promise(function(resolve, reject){
    pool.query(queryQuestion, (err, res) => {
      console.log('running query', queryQuestion);
      if (err) {
        console.error('!!!!!!!!!!!', err);
        return;
      }
      for (let row of res.rows) {
        console.log('rows -->', row);
        //can do a query call wirh row.question_id
        //call for FK = row.question_id
        //if returns add key answers with values the return object
      }
      console.log('final answer', res.rows);
      // pool.end();
    });
  })

}

exports.questionRouter=questionRouter;
exports.postQuestionsRoute=postQuestionsRoute;
exports.addQuestion=addQuestion;