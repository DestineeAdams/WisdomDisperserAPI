# Wisdom Dispenser API  
Handles creating, updating, and fetching quotes including a random quote endpoint. Perfect for integration into other projects or services.

**See project running here:** https://wisdomdisperserapi.onrender.com ✨  
**Related projects:** https://the-wisdom-dispenser.onrender.com

**Tech used:** JavaScript, Node.js, MongoDB, Express, dotenv

## How the Data Is Organized

```json
{
  "_id": "",

  "quotes": [
    "jen was here",
    "hello world"
  ],
  
  "author": "jen",
  
  "rating": {
    "$numberInt": "10"
  }
}
```

- *Every rating starts out at ten.*  
- *Every string entry is transferred to lowercase.*

## HTTP Methods

### `POST`  
**Endpoint:** `/api/"quote"/"author"`  
- Checks if the quote already exists in the database.  
  - If it does, the user is pointed to use the `PUT` method instead.  
  - If not, the quote is added.

### `GET`  
**Endpoint:** `/api`  
- Returns all data in the database.

**Endpoint:** `/api/random`  
- Returns one random document.

### `PUT`  
**Endpoint:** `/api/"quote"/"author"`  
- Checks if the author exists in the database.  
  - If so, checks whether the quote already exists.  
  - If not, adds the quote to the author's quote array.

**Endpoint:** `/api/rate/"quote"/"author"`  
- *Coming soon*

### `DELETE`  
**Endpoint:** `/api/del/"quote"/"author"`  
- *Coming soon*

## Optimizations
- [ ] Implement a system to prevent offensive language from being added to the database.  
- [ ] Restructure the schema for scalability and flexibility.
