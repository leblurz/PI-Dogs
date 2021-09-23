require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Method UNIQ
const _ = require('lodash');

// DB
const { Temperament } = require('../db');

const router = Router();

const { allData } = require( '../requests/requests')

router.get ('/temperament', async (req, res) => {
    try {

        const data = await allData();
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

module.exports = router;

