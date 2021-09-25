const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Method UNIQ
const _ = require('lodash');

// DB
const { Breed, Temperament } = require('../db');

const router = Router();

router.post('/', async (req, res) => {
    const { name, height, weight, temperament,
        life, image } = await req.body; 
    // Creacion de la columna
    try {
        // Se crea la raza
        const perro = await Breed.create({
            name : name,
            height: height,
            weight : weight,
            life : life + ' ' + "years",
            image : image
        })

        const ifCreated = await Temperament.findAll({
            where: {
                name: temperament.replace(/^\w/, (c) => c.toUpperCase())
        }
    })

    if(ifCreated.length > 0) {
        perro.addTemperament(ifCreated[0].dataValues.id)
    }

    else {
    // Se crea el temperamento
    const tempDB = await Temperament.create({
            name: temperament.replace(/^\w/, (c) => c.toUpperCase()),
    });
    // Se relacionan
    perro.addTemperament(tempDB);
    }
    res.status(200).json(perro)
    } 
    catch(error) {
        res.status(500).send('error')
    };
});

module.exports = router;