import React, { useEffect } from 'react';
import '../styles/Breed.css';


// Action Creator
import { getById } from "../actions";

import { useDispatch, useSelector } from 'react-redux';

// Lodash
import _ from 'underscore';


export default function Breed (prop) {
    // Dispatcher
    const dispatch = useDispatch();
    const idProp  = prop.match.params.id;

    useEffect(() => {
        dispatch(getById(idProp))
        //array de dependencia
    }, [dispatch])

    // State to dog and filt if the state are same or not
    const dog = useSelector( e => e,  _.isEqual)

    return (
            <div>
                {
                    // Loading Image
                    dog.loading === true ? 
                    <div className='loadingDog'> 
                        <img src='https://reygif.com/media/1/pug-corriendo-10974.gif' alt='loading' />
                    </div>
                    :
                    // Data
                    <div className='containerConta' >
                        <div className='containerDog'>
                            <div className='imgDog'>
                                <img src={dog.payload[0].image} alt='Dog'/>
                            </div>
                            <div className='textDog'>
                                <h3>Name: {dog.payload[0].name}</h3>
                                <h3>Height: {dog.payload[0].height} CM</h3>
                                <h3>Weight: {dog.payload[0].weight} KG</h3>
                                <h3>Temperament/s: {dog.payload[0].temperament}</h3>
                                <h3>Life: {dog.payload[0].life}</h3>
                            </div>
                        </div>
                    </div>
                }
            </div>
    );
};
