require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Method UNIQ
const _ = require('lodash');
const { forEach } = require('lodash');


// DB
const { Breed, Temperament } = require('../db');

// Axios
const axios = require('axios');

// Api key
const {
    KEY
} = process.env;

// Routes
const DogRouter = require('./dogTemp');
const DogsRouter = require('./dogs');
const DogsId = require('./dogsId');
const DogPost = require('./postDog');

const e = require('express');

const router = Router();

const { allData, dataDB, apiData } = require( '../requests/requests')

router.use('/dogs', DogRouter);
router.use('/dogs', DogsId);
router.use('/dogs', DogsRouter);
router.use('/dog', DogPost);


module.exports = router;
