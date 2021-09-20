require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Method UNIQ
const _ = require('lodash')

// DB
const { Breed, Temperament } = require('../db')

// Axios
const axios = require('axios');

// Api key
const {
    KEY
} = process.env;

// Routes
const DogRouter = require('./dog');

const router = Router();

// Axios a la api
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
    })
    return dataApi;
};

// const dbData = async () => {

// }

router.get('/dogs/temperament', async (req, res) => {
    const data = await apiData();
    const temp = [];
    const st = [];

    // Separa los strings en nuevos arreglos divididos entre las comas
    data.map (e=> {
        if (e.temperamento) {
            temp.push(e.temperamento.split(','));
        }
    });

    // Pushea todas las palabras a un nuevo array
    for(let i=0;i<temp.length;i++){
        temp[i].forEach(e => {
            st.push(e);
        });
    };

    // Filtra los repetidos
    const uni = _.uniq(st)

    // uni.forEach ( e => {
        
    // });

    return res.status(200).json(uni)
});



router.get(`/dogs/:id`, async (req, res) => {
    const paras = req.params.id;

    // Parseado de los params
    const idRaza = parseInt(paras)
    const data = await apiData();

    // Filtrado por id
    const arr = data.filter (e => e.id === idRaza);

    // Caso encontrado
    if (arr.length > 0){
        res.status(200).json(arr)
    }

    // Caso no encontrado
    else {
        res.status(400).send('No se encontro el perro buscado')
    };
});

router.get('/dogs', async (req, res) => {
    const raza = req.query.name;
    const data = await apiData();

    // Caso con query
    if (raza){

        // Filtrado de razas
        const filt = data.filter(e => e.nombre.toLowerCase().includes(raza.toLowerCase()));

        if (filt.length > 0){
            // En caso de matchear
            res.status(200).json(filt)
        }

        else {
            // Raza no encontrada
            res.status(400).json('Raza no encontrada')
        };
    }

    // Caso sin query
    else {
        res.status(200).json(data)
    };
});



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/dogs', DogRouter)



module.exports = router;
