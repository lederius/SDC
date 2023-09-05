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