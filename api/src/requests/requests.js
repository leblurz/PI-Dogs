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
            id: e.id.toString(),
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
        return filt.push({
            nombre: e.nombre,
            altura: e.altura,
            peso: e.peso,
            vida: e.vida,
            Image: e.Image,
            id: e.id,
            temperamento: e.temperaments[0].dataValues.name
        });
    });
    return filt;
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