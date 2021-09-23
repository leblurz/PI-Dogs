require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Method UNIQ
const _ = require('lodash');

// Axios
const axios = require('axios');

const router = Router();

const { allData } = require( '../requests/requests')

router.get('/', async (req, res) => {
    const raza = req.query.name;
    const data = await allData();
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

module.exports = router;