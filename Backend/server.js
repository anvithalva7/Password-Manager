const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())


const port = 3000
console.log(process.env.MONGO_URI);

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'ForEver';
client.connect();


// Get 
app.get('/',async  (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})


// POST
app.post('/',async  (req, res) => {
  // let pass=req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.insertOne(req.body)
  res.json({success:true,result:findResult})
})


// DELETE
app.delete('/',async  (req, res) => {
  // let pass=req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.deleteOne(req.body) 
  res.json({success:true,result:findResult})
})



app.listen(port, () => { 
  console.log(`Example app listening on port http://localhost:${port}`)
})    