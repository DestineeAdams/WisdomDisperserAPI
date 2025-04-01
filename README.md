# WisdomDisperserAPI
api for the The Wisdom disperser project

Tech used: JavaScript, node.js, mongodb, express, dotenv

## How the data is oganized
    {
        "_id":{""},
        
        "quotes":
            [
            "jen was here",
            "hello world"
            ],
            
        "author":"jen",
        
        "rating":
            {
            "$numberInt":"10"
            }
    }
    
 
* *every rating starts out at ten*
* *every string entry tranfered to lower case*



## http methods

###### POST
**query:** ```/api/"quote"/"author"```
    
checks if quote already is in database if so piont user to use the PUT query instead
if not add in new quote
    
###### GET
**query:** ```/api```
    
returns all data in the data base
    
###### PUT
**query:** ```/api/"quote"/"author"```
    
checks if author already is in database 
if so checks quote is already is in database
if note add quote to array
    
###### DELETE
*coming soon*


## Optimizations
find a way to make sure offensive language isn't added

## sourceing
right now the data is sourced form various places on the internet
- https://parade.com/1100530/marynliles/african-proverbs/
- https://medium.com/illumination/50-african-proverbs-and-wise-sayings-with-their-meanings-aac8e8fcd920
- https://www.azquotes.com/quotes/topics/wisdom.html
