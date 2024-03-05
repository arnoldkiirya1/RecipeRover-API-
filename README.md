
## RecipeRover API: ALX FINAL Webstack-Portfolio Project - Backend
//======================================================
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Project Structure](#project-structure)
  * [Package Modules](#package-modules)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)
* [Related Project](#related-project)



<!-- ABOUT THE PROJECT -->
## About The Project

RecipeRover API is a RESTful API designed to provide developers with easy access to a vast collection of recipes from various cuisines worldwide. The API will offer endpoints for searching, retrieving, and managing recipes, allowing developers to integrate recipe functionalities into their applications seamlessly. Each recipe will include detailed information such as ingredients, instructions, dietary preferences, and nutritional facts. This API handles every functions in Food Recipes Application, such as:
- User   : Register, login, update and delete
- Recipe : Insert new recipe, update, delete, like a recipe, save a recipe, and get list of recipe

### Project Structure
```
|── RECIPEROVER-API
   |── assets                                  # Public assets
   |── src                                     # Project source code
       |── config                              # Database configuration
       |── controller                          # Request controller
       |── helper                              # Cloudinary setting, Env setting, JWT generation and response
       |── middleware                          # Middleware configuration
       |── model                               # Database query model
       |── route                               # API Endpoint routes
   |── .env                                    # Environment variables   
   |── .gitignore                              # Files that should be ignored  
   |── db.sql                                  # SQL database creation
   |── index.js                                # Index file
   |── README.md                               # Readme 
   |── RecipeRover-API.postman_collection.json # Postman Documentation
```

### Package Modules Used in this project

Below are lists of modules used in this API:

* [Node JS](https://nodejs.org/en/docs/)
* [Express JS](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Multer](https://www.npmjs.com/package/multer)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [CORS](https://www.npmjs.com/package/cors)
* [Pg](https://www.npmjs.com/package/pg)
* [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [Cloudinary](https://cloudinary.com/)
* [Nodemon](https://www.npmjs.com/package/nodemon)



