require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Method UNIQ
const _ = require('lodash');

// DB
const { Breed, Temperament } = require('../db');

// Axios
const axios = require('axios');

// Api key
const {
    KEY
} = process.env;

// Axios to API
const apiData = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${KEY}`);
    const dataApi = await api.data.map ( e => {
        return {
            id: e.id.toString(),
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            temperament: e.temperament !== undefined ? e.temperament : 'Lonely',
            // Traduccion al español
            life: e.life_span,
            image: e.image.url,
        };
    });
    return dataApi;
};

// Fetch to DB
const dataDB = async () => {
    const pedido = await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throught: {
                attributes: [],
            },
        }
    });
    const filt = [];
    pedido.forEach(e => {
        const unidos = e.temperaments.map(e=>e.dataValues.name)
        return filt.push({
            name: e.name,
            height: e.height,
            weight: e.weight,
            life: e.life,
            image: e.image,
            id: e.id,
            temperament: unidos.join(', ')
        });
    });
    return filt;
};

// All data
const allData = async () => {
    const DB = await dataDB();
    const Api = await apiData();
    return DB.concat(Api)
};


module.exports = {
    allData,
    apiData,
    dataDB
};