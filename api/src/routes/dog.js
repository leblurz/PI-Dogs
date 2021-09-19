require('dotenv').config();
const { Router } = require('express');

// Axios
const axios = require('axios');
const router = require('.');

// Api key
const {
    KEY
} = process.env;

module.exports = router;
