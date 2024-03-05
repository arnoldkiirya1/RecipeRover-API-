// Load environment variables from .env file
require('dotenv').config(); 

// Import necessary modules
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');

const userRouter = require('./src/route/user.routes.js');
const recipeRouter = require('./src/route/recipe.routes.js')

const app = express();

try {
  app.use(express.static('assets'))
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(xss());
  app.use(cors());
  app.use(cookieparser());
  app.use(userRouter);
  app.use(recipeRouter);

  app.listen(process.env.PORT, () => {
    console.log('SERVICE IS RUNNING ON PORT ' + process.env.PORT);
  })
} catch (err) {
  console.log(err);
}

