# Implementing JWT Authentication in React Applications with Refresh Tokens #

JSON Web Tokens (JWT) are a common method for handling authentication in modern web applications. They are compact, easy to use, and allow for stateless authentication systems. However, JWTs typically have short expiry times for security purposes, which can lead to the need for refresh tokens. This document provides a step-by-step guide on implementing JWT authentication in a React application using refresh tokens.

## Overview ##

Authentication in React can be achieved through a combination of JWTs for access control and refresh tokens to maintain user sessions even after the access token expires. Here's how it generally works:

1. **User Login**: The user logs in and receives an access token and a refresh token.
2. **Token Usage**: The access token is used to authenticate requests.
3. **Token Expiry**: Upon expiry of the access token, the refresh token is used to request a new access token.
4. **Token Storage**: Store tokens securely to prevent cross-site scripting (XSS) attacks.

## Step-by-Step Guide ##

### Step 1: Backend Setup ###

First, ensure your backend is set up to issue JWTs and refresh tokens. This involves:

- **User Authentication**: Validate user credentials and generate a token pair.
- **Refresh Token Endpoint**: Implement an endpoint to exchange expired access tokens using a refresh token.

### Step 2: Frontend Setup ###

#### 2.1 Install Required Packages ####

For handling HTTP requests and token management, install the following packages:

```bash
npm install axios jwt-decode
```

#### 2.2 Setting Up Axios ####

Configure Axios to include the JWT in HTTP headers for requests requiring authentication.

```javascript
// src/utils/axiosConfig.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://your-api-url',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

#### 2.3 Implement Login and Token Storage ####

Create a function that handles user login and stores tokens.

```javascript
// src/services/authService.js
import apiClient from '../utils/axiosConfig';

export const login = async (username, password) => {
  const response = await apiClient.post('/auth/login', { username, password });
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
};
```

#### 2.4 Handle Token Refresh ####

Create a mechanism to refresh access tokens when they expire using a refresh token.

```javascript
// src/hooks/useAuth.js
import { useCallback } from 'react';
import apiClient from '../utils/axiosConfig';
import jwtDecode from 'jwt-decode';

export const useAuth = () => {
  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const response = await apiClient.post('/auth/refresh-token', { token: refreshToken });
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    }
    return null;
  }, []);

  return { refreshToken };
};
```

#### 2.5 Axios Response Interceptor ####

Add an Axios interceptor to handle token expiry automatically.

```javascript
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const { refreshToken } = useAuth();
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(error.config);
      }
    }
    return Promise.reject(error);
  }
);
```

### Step 3: Secure Token Storage ###

When implementing storage, use `localStorage` or `sessionStorage` with caution, as these are vulnerable to XSS attacks. Consider using HTTP-only cookies for storing refresh tokens when designing a full-stack application.

## Conclusion ##

By following the steps above, you can implement JWT-based authentication with refresh tokens in a React application, ensuring secure and seamless user sessions. For enhanced security, always validate both access and refresh tokens on the server side and implement safeguards against token misuse.
