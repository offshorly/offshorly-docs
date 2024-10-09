# Setting up a Python Flask Application with a Login Endpoint #

This guide demonstrates how to create a basic Flask application with a login endpoint.

## Flask Setup ##

First, install Flask:

```bash
pip install flask
```

Create a new Python file (e.g., `app.py`) and add the following code:

```python
from flask import Flask, request, jsonify
import bcrypt

app = Flask(__name__)

# Mock user database (replace with a real database in production)
users = {
    "user1": bcrypt.hashpw("password1".encode('utf-8'), bcrypt.gensalt()),
    "user2": bcrypt.hashpw("password2".encode('utf-8'), bcrypt.gensalt())
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username in users and bcrypt.checkpw(password.encode('utf-8'), users[username]):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
```

## Explanation ##

1. We import necessary modules from Flask and bcrypt for password hashing.
2. We create a Flask application instance.
3. We define a mock user database with hashed passwords (replace this with a real database in production).
4. We create a `/login` route that accepts POST requests.
5. The login function checks the provided credentials against the mock database using bcrypt for password verification.
6. If the credentials are valid, it returns a success message; otherwise, it returns an error.

## Running the Application ##

To run the application, execute the following command in your terminal:

```bash
python app.py
```

The server will start, and you can test the login endpoint using a tool like cURL or Postman.

## Testing the Login Endpoint ##

Use cURL to test the login endpoint:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"password1"}' http://localhost:5000/login
```

This should return a success message if the credentials are correct.

Remember to implement additional security measures, such as secure session management and HTTPS, in a production environment.
