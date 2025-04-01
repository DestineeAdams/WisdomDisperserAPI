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
    
    
    
    // add a quotes to a existing author
    app.put('/api/:quotes/:author',  (req, res) => {
      req.params.author = req.params.author.toLowerCase();
      req.params.quotes = req.params.quotes.toLowerCase();
            
      quotesCollection
      .findOne({'quotes': req.params.quotes,'author': req.params.author} )
      .then(result => {
        console.log(result);
        
        if(result){
          res.statusMessage = `not inserted under quotes already exist for that ${req.params.author}`;
          res.status(204).end();
          
       
        }
        
        else {
             quotesCollection
          .updateOne({ 'author': req.params.author}, { $push:{'quotes': req.params.quotes }})
          .then(result => {
              // console.log(result);
              console.log(req.body);
              
              res.statusMessage = `quotes inserted under ${req.params.author}`;
              res.status(200).end();
          })  
          .catch(error => console.error(error))
        }
      
      })
      .catch(error => console.error(error))
    })
    
    
    // add a quotes to a new author
    app.post('/api/:quotes/:author',  (req, res) => {
      req.params.quotes = req.params.quotes.toLowerCase();
      req.params.author = req.params.author.toLowerCase();
      
      quotesCollection
        .findOne({'quotes': req.params.quotes, 'author': req.params.author})
        .then(result => {
          console.log(result);
          
          if (result) {
            res.statusMessage = "quote is already in database";
            res.status(204).end();
          } 
          else {
            quotesCollection
              .findOne({'author': req.params.author})
              .then(result => {
                console.log(result)
                
                
                if (result) {
                  res.statusMessage = "author is already in database use put with this endpoint add a quote";
                  res.status(204).end();
                }   
                else {
                  quotesCollection
                    .insertOne({"quotes":[req.params.quotes], "author":req.params.author, "rating":10})
                    .then(result => {
                      console.log(result)
                    })
                    .catch(error => console.error(error))
                    
                    res.statusMessage = "added to data base";
                    res.status(200).end();
                    
                } 
            
              })
              .catch(error => console.error(error));
              
          
          }
          
        })
        .catch(error => console.error(error))
    
    })
    
    
  
    app.listen(process.env.PORT, () => {
      console.log(`listening on http://localhost:${process.env.PORT} 👍🏾`);
    })


  })
  .catch(console.error)


