const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectionString = `mongodb+srv://${process.env.mongodbUSERNAME}:${process.env.mongodbPASS}@cluster0.rusjhfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to Database 👍🏾');
    const db = client.db('wisdom');
    const quotesCollection = db.collection('quotes');
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    // get all qoutes
    app.get('/api', (req, res) => {
      db.collection('quotes')
      .find()
      .toArray()
      .then(results => {
        res.json(results)
      })
      .catch(error => console.error(error))
    })
  

    
    // add a quote
    app.post('/api/:quote/:author',  (req, res) => {
      
      req.params.quote = req.params.quote.toUpperCase();
      req.params.author = req.params.author.toUpperCase();
      
      const info = req.params;
    
      console.log(info);
      
      
      quotesCollection
        .findOne({'quote': info.quote})
        .then(result => {
          console.log(result);
          
          if (result) {
          
            res.statusMessage = "quotes is already in database";
            res.status(204).end();
          } else {
            quotesCollection
              .insertOne(info)
              .then(result => {
                console.log(result)
              })
              .catch(error => console.error(error))
              
            res.statusMessage = "added to data base";
            res.status(200).end();

          }
        })
        .catch(error => console.error(error))
    
   
    
    })
    
    app.listen(process.env.PORT, () => {
      console.log(`listening on http://localhost:${process.env.PORT} 👍🏾`);
    })


  })
  .catch(console.error)


