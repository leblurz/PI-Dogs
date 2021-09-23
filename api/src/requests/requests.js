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

const apiData = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${KEY}`);
    
    const dataApi = await api.data.map ( e => {
        return {
            id: e.id,
            nombre: e.name,
            altura: e.height.metric,
            peso: e.weight.metric,
            temperamento: e.temperament,
            // Traduccion al español
            vida: e.life_span.replace("years", "años"),
            Image: e.image.url,
        };
    });
    return dataApi;
};

const dataDB = async () => {
    return await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throught: {
                attributes: [],
            },
        }
    });
};

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