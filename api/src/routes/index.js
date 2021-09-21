require('dotenv').config();
const { Router } = require('express');
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

// Routes
const DogRouter = require('./dog');
const { forEach } = require('lodash');

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
    });
    return dataApi;
};

// const dbData = async () => {

// }

router.get ('/dogs/temperament', async (req, res) => {

    try {

        const data = await apiData();
        const temp = [];
        const st = [];

        // Separa los strings en nuevos arreglos divididos entre las comas
        data.map ( e => {
            if (e.temperamento) {
                temp.push(e.temperamento.split(','));
            };
        });

        // Pushea todas las palabras a un nuevo array
        for(let i=0;i<temp.length;i++){
            temp[i].forEach(e => {
                st.push(e);
            });
        };

        // Saca los espacios al principip
        const space = st.map(e=>e.trim())
        // Filtra los repetidos
        const uni = _.uniq(space);

        // Crea el temperamento si no existe
        uni.forEach ( e => {

            if ( e !== '') {
                Temperament.findOrCreate ({
                    where: {
                        name: e
                    }
                });
            };
        });

        // Los selecciona y ordena de forma ascendente 
        const temps = await Temperament.findAll( { order:[ [ 'name','ASC' ] ] } );

        return res.status(200).json(temps);
    }
    // Catch en caso de error
    catch (error) {
        return res.status(400).send('Error')
    }
});




router.get(`/dogs/:id`, async (req, res) => {
    const paras = req.params.id;

    try {
        // Parseado de los params
        const idRaza = parseInt(paras);
        const data = await apiData();

        // Filtrado por id
        const arr = data.filter (e => e.id === idRaza);

        // Caso encontrado
        if (arr.length > 0){
            res.status(200).json(arr)
        }

        // Caso no encontrado
        else {
            res.status(400).send('No se encontro el perro buscado');
        };
    }
    // Caso de error
    catch {
        res.status(400).send('Hubieron conflictos al buscar el perro');
    }
});

router.get('/dogs', async (req, res) => {
    const raza = req.query.name;
    const data = await apiData();

    try {
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
    }
    // Caso de error
    catch{
    res.status(400).json('Hubieron conflictos en la busqueda')
    }
});

router.post('/dog', async (req, res) => {
    const data = await req.body;

    // De obj a array
    data.values();

    // Creacion de la columna
    const raza = await data.forEach (e => {
        if ( e !== '') {
            console.log(e)
            Breed.findOrCreate ({
                where: {
                    nombre: e.nombre,
                    altura: e.altura,
                    peso: e.peso,
                    vida: e.vida,
                    image: e.image
                }
            });
        }
    });
    res.status(200).json(data)
});


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/dogs', DogRouter)



module.exports = router;
