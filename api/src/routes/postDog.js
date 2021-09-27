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
    
    // Separado de comas
    const st = [];
    const tempSplitted = temperament.split(',');
    for(let i=0;i<tempSplitted.length;i++){
        st.push(tempSplitted[i])
        };
    const space = st.map(e => e.trim())
    // En caso de ue se repita un temperamento agregado
    const uni = _.uniq(space);

    try {
        // Se crea la raza
        const perro = await Breed.create({
            name : name,
            height: height,
            weight : weight,
            life : life + ' ' + "years",
            image : image ? image : 'https://st.depositphotos.com/1798678/3986/v/600/depositphotos_39864187-stock-illustration-dog-silhouette-vector.jpg'
        })

        // Mientras exista un temperamento en el array realizamos la logica siguiente
        while(uni.length){
            // Extraemos el primer elemento
            const tempUse = uni.shift();
            let ifCreated = await Temperament.findAll({
                where: {
                    name: tempUse.replace(/^\w/, (c) => c.toUpperCase())
                }
            })

            // En caso de ya estar creado
            if(ifCreated.length > 0) {
                perro.addTemperament(ifCreated[0].dataValues.id)
            }

            // En caso de no estar creado
            else {
            // Se crea el temperamento
            const tempDB = await Temperament.create({
                    name: tempUse.replace(/^\w/, (c) => c.toUpperCase()),
            });
            // Se relacionan
            perro.addTemperament(tempDB);
            }
        }
    res.status(200).json(perro)
    } 
    catch(error) {
        res.status(500).send('error')
    };
});

module.exports = router;