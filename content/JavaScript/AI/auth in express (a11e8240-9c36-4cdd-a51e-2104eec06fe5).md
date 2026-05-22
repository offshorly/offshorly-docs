# Express Authentication Guide #

This guide covers implementing authentication in Express.js applications using popular methods including JWT tokens, sessions, and middleware patterns for securing routes.

## JWT Token Authentication ##

1. Install required dependencies for JWT authentication:

   ```bash
   npm install jsonwebtoken bcryptjs express-rate-limit
   ```

2. Create a JWT utility module for token operations:

   ```js
   const jwt = require('jsonwebtoken')
   const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

   const generateToken = (payload) => {
     return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
   }

   const verifyToken = (token) => {
     return jwt.verify(token, JWT_SECRET)
   }

   module.exports = { generateToken, verifyToken }
   ```

3. Implement user registration with password hashing:

   ```js
   const bcrypt = require('bcryptjs')
   const { generateToken } = require('./jwt-utils')

   app.post('/register', async (req, res) => {
     try {
       const { email, password } = req.body
       const hashedPassword = await bcrypt.hash(password, 10)

       // Save user to database (example)
       const user = await User.create({ email, password: hashedPassword })

       const token = generateToken({ userId: user.id, email: user.email })
       res.json({ token, user: { id: user.id, email: user.email } })
     } catch (error) {
       res.status(400).json({ error: error.message })
     }
   })
   ```

4. Create login endpoint with credential verification:

   ```js
   app.post('/login', async (req, res) => {
     try {
       const { email, password } = req.body
       const user = await User.findOne({ email })

       if (!user || !(await bcrypt.compare(password, user.password))) {
         return res.status(401).json({ error: 'Invalid credentials' })
       }

       const token = generateToken({ userId: user.id, email: user.email })
       res.json({ token, user: { id: user.id, email: user.email } })
     } catch (error) {
       res.status(400).json({ error: error.message })
     }
   })
   ```

5. Build authentication middleware for protected routes:

   ```js
   const { verifyToken } = require('./jwt-utils')

   const authenticateToken = (req, res, next) => {
     const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1]

     if (!token) {
       return res.status(401).json({ error: 'Access token required' })
     }

     try {
       const decoded = verifyToken(token)
       req.user = decoded
       next()
     } catch (error) {
       return res.status(403).json({ error: 'Invalid or expired token' })
     }
   }

   module.exports = authenticateToken
   ```

6. Apply authentication middleware to protected routes:

   ```js
   const authenticateToken = require('./auth-middleware')

   app.get('/profile', authenticateToken, (req, res) => {
     res.json({ message: 'Protected route', user: req.user })
   })

   app.get('/dashboard', authenticateToken, async (req, res) => {
     const userData = await User.findById(req.user.userId)
     res.json({ dashboard: 'data', user: userData })
   })
   ```

## Session-Based Authentication ##

7. Configure express-session for session management:

   ```js
   const session = require('express-session')
   const MongoStore = require('connect-mongo')

   app.use(
     session({
       secret: process.env.SESSION_SECRET || 'session-secret',
       resave: false,
       saveUninitialized: false,
       store: MongoStore.create({ mongoUrl: 'mongodb://localhost/myapp' }),
       cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
     }),
   )
   ```

8. Implement session-based login and logout:

   ```js
   app.post('/session-login', async (req, res) => {
     const { email, password } = req.body
     const user = await User.findOne({ email })

     if (user && (await bcrypt.compare(password, user.password))) {
       req.session.userId = user.id
       req.session.email = user.email
       res.json({ message: 'Login successful', user: { id: user.id, email } })
     } else {
       res.status(401).json({ error: 'Invalid credentials' })
     }
   })

   app.post('/logout', (req, res) => {
     req.session.destroy((err) => {
       if (err) return res.status(500).json({ error: 'Logout failed' })
       res.json({ message: 'Logout successful' })
     })
   })
   ```
