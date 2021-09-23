require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Axios
const axios = require('axios');

const router = Router();

const { dataDB, apiData } = require( '../requests/requests')

router.get('/:id', async (req, res) => {
    const paras = req.params.id;
    try {
        // Obteniendo data
        if (paras.length === 36) {
            const DB = await dataDB();
            const arrDB = DB.filter(e=>e.id === paras);
            console.log(arrDB)
            if (arrDB.length > 0){
                return res.status(200).json(arrDB);
            }
            else {
                return res.status(400).send('Raza no encontrada');
            };
        }

        else {
            const API = await apiData();
            const arrAPI = API.filter (e => e.id === paras);
            if (arrAPI.length > 0){
                return res.status(200).json(arrAPI);
            }
            else{
                return res.status(400).send('Raza no encontrada');
            };
        };
    }
    // Caso de error
    catch {
        res.status(400).send('Hubieron conflictos al buscar la raza solicitada');
    };
});

module.exports = router;