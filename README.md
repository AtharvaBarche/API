REST API Repository

This repository contains a collection of REST APIs implemented using the MVC (Model-View-Controller) architecture.
These APIs provide functionality for performing CRUD (Create, Read, Update, Delete) operations on various resources.

Table of Contents:-
Introduction
Technologies Used
Folder Structure
API Endpoints
Users
Posts
Setup
Usage
Contributing

Introduction
This repository serves as a foundation for building RESTful APIs using the MVC architectural pattern.
It provides a structured approach to organize code and separate concerns, making the application scalable and maintainable.

Technologies Used
Node.js
Express.js
MongoDB (with Mongoose)
Other necessary dependencies 

Folder Structure
The repository follows the MVC pattern for organizing code:
project/
│
├── controllers/
│   ├── UserController.js
│   
│
├── models/
│   ├── User.js
│   
│
├── routes/
│   ├── User.js
│
│
└── index.js

controllers/: Contains controller files responsible for handling business logic.
models/: Contains model files defining data schemas and interacting with the database.
routes/: Contains route files defining API endpoints and corresponding controller methods.
index.js: Main entry point of the application.

API Endpoints

GET /: Get all users
GET /profile:id : Get user by ID
POST /login: Create a new user
POST /register: Create a new user
DELETE /profile:id : Delete user by ID

Usage
Send HTTP requests to the defined API endpoints to perform CRUD operations.
Use tools like Postman or curl for testing the APIs.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request.




