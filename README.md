# Contact Management System

This is a Contact Management System built using **Node.js** and **MongoDB**, with **User Authentication** to manage contacts for each individual user securely.

## Features

- User Authentication using **JWT (JSON Web Tokens)**
- Secure password storage with **bcrypt.js**
- **CRUD** operations (Create, Read, Update, Delete) for managing contacts
- Contact data is isolated per user using a unique reference key (user ID)
- Input validation and error handling
- Scalable and secure backend using **Node.js** and **Express.js**

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt.js
- **Validation**: Express Validator (or Joi)
- **Security**: Helmet.js

## Database Structure

### Users Collection

- Stores user data, including encrypted passwords and authentication tokens.
- Each user is associated with a unique **_id**.

### Contacts Collection

- Stores each user's contact information (name, phone number, email, etc.).
- Each contact is associated with a specific user via a reference key (user ID), ensuring each user's contact data remains isolated from others.

## API Endpoints

### User Authentication

- **POST /api/signup**:  
  Create a new user account.  
  Request Body Example:
  ```json
  {
    "Username": "John Doe",
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
