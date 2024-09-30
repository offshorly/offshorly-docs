# Adding Middleware in Express #

Express middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle, commonly denoted by a variable named `next`.

## Basic Middleware Usage #

Here's how you can add middleware to your Express application:

```javascript
const express = require('express');
const app = express();

// Middleware function
const myMiddleware = (req, res, next) => {
  console.log('This middleware is running!');
  next(); // Don't forget to call next() to pass control to the next middleware
};

// Using the middleware
app.use(myMiddleware);

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Application-level Middleware #

You can add middleware that applies to all routes:

```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
```

## Route-specific Middleware #

You can add middleware to specific routes:

```javascript
const authMiddleware = (req, res, next) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.get('/protected', authMiddleware, (req, res) => {
  res.send('Protected route');
});
```

## Error-handling Middleware #

Error-handling middleware takes four arguments instead of three:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## Built-in Middleware #

Express has some built-in middleware that you can use:

```javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

Remember to place your middleware functions in the correct order, as they are executed sequentially.
