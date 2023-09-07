const express = require('express');
const app = express();
const axios = require('axios');
const basePath = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/?product_id=';
const postPath ='https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/'
const answerHelpPath ='https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/'


// questionRouter = (req, res) => {
//   let product_id = req.params.product_id;
//   // do a query to return all the question for this product
//   const query = `
//     SELECT question_id, question_body, question_date, asker_name, question_helpfulness, answers
//     WHERE product_id=${product_id}
//     FROM Questions
//   `;
//   pool.query(query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     for (let row of res.rows) {
//         console.log('rows -->', row);
//     }
//     console.log('res -->', res);
//     pool.end();
// });
//   //should return{
//     // product_id: Number
//     // results: [
//     //   {
//     //     question_id: number
//     //     question_body: string
//     //     question_date: '2023-08-17T00:00:00.000Z'
//     //     asker_name: string
//     //     question_helpfulness: number
//     //     answers: object
//     //   }
//     // ]
//   //}
//   //count relates to sets of results being dispalyed
//   //page relates to which ones displayed
// console.log('req in router', req);
// };

// exports.questionRouter= questionRouter;