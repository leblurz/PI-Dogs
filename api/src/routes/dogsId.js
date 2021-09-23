require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Axios
const axios = require('axios');

const router = Router();

const { allData } = require( '../requests/requests')

router.get('/:id', async (req, res) => {
    const paras = req.params.id;

    try {
        // Obteniendo data
        const data = await allData();
        // To String para comparar DB y Api
        const dataStr = data.map(e=> (
            {
                id: e.id.toString(),
                nombre: e.nombre,
                altura: e.altura,
                peso: e.peso,
                temperamento: e.temperamento ? e.temperamento : e.temperaments,
                vida: e.vida,
                Image: e.Image
            }
        ))

        // Filtrado por id
        const arr = dataStr.filter (e => e.id === paras);

        // Caso encontrado
        if (arr.length > 0){
            res.status(200).json(arr)
        }
        else{
            res.status(400).send('Error')
        }
    }
    // Caso de error
    catch {
        res.status(400).send('Hubieron conflictos al buscar el perro');
    }
});

module.exports = router;