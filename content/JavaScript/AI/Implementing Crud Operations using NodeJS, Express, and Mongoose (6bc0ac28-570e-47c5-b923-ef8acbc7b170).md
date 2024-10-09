# Implementing CRUD Operations #

This guide demonstrates how to implement CRUD (Create, Read, Update, Delete) operations using a RESTful API with Node.js, Express, and MongoDB. These fundamental database operations are essential for most applications.

## Setup #

First, install the necessary dependencies:

```bash
npm init -y
npm install express mongoose body-parser
```

## Create Express Server #

Create a file named `server.js`:

```javascript
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/crudapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
```

## Define Model #

Create a file named `models/item.js`:

```javascript
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
})

module.exports = mongoose.model('Item', itemSchema)
```

## Implement CRUD Operations #

Add the following routes to `server.js`:

```javascript
const Item = require('./models/item')

// Create
app.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body)
    await item.save()
    res.status(201).send(item)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Read (all items)
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find()
    res.send(items)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Read (single item)
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404).send('Item not found')
    res.send(item)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Update
app.put('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!item) return res.status(404).send('Item not found')
    res.send(item)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete
app.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).send('Item not found')
    res.send(item)
  } catch (error) {
    res.status(500).send(error)
  }
})
```

## Testing #

Use tools like Postman or cURL to test your API endpoints:

- Create: POST `http://localhost:3000/items`
- Read All: GET `http://localhost:3000/items`
- Read One: GET `http://localhost:3000/items/:id`
- Update: PUT `http://localhost:3000/items/:id`
- Delete: DELETE `http://localhost:3000/items/:id`

Remember to replace `:id` with an actual item ID when testing.

This implementation provides a basic CRUD API using Express and MongoDB. For production use, consider adding input validation, error handling, and authentication.
