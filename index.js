const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config({ path: "./config/.env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectionString = `mongodb+srv://${process.env.mongodbUSERNAME}:${process.env.mongodbPASS}@cluster0.rusjhfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = process.env.PORT || 4000;

MongoClient.connect(connectionString)
  .then(client => {
  
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    console.log('Connected to Database');
    const db = client.db('wisdom');
    const quotesCollection = db.collection('quotes');
    
    //Using EJS for views
    app.set("view engine", "ejs");
    
    //Static Folder
    app.use(express.static("public"));
    
    // home route
    app.get('/', (req, res) => {
      res.render('index.ejs');
    })
    
    // get all qoutes
    app.get('/api', (req, res) => {
      quotesCollection
      .find()
      .toArray()
      .then(results => {
        res.json(results)
      })
      .catch(error => console.error(error))
    })
    
    // get one random document
    app.get('/api/random', (req, res) => {
      quotesCollection
      .aggregate([{ $sample: { size: 1 } }])
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
        
        if(result){
          res.statusMessage = `not inserted under quotes already exist for that ${req.params.author}`;
          res.status(204).end();
        }
        
        else {
             quotesCollection
          .updateOne({ 'author': req.params.author}, { $push:{'quotes': req.params.quotes }})
          .then(result => {
              
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
          
          if (result) {
            res.statusMessage = "quote is already in database";
            res.status(204).end();
          } 
          else {
            quotesCollection
              .findOne({'author': req.params.author})
              .then(result => {
                
                
                if (result) {
                  res.statusMessage = "author is already in database use put with this endpoint add a quote";
                  res.status(204).end();
                }   
                else {
                  quotesCollection
                    .insertOne({"quotes":[req.params.quotes], "author":req.params.author, "rating":10})
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
 
  
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    })


  })
  .catch(console.error)


