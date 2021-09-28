import React, { useEffect } from 'react';

// Action Creator
import { getById } from "../actions";

import { useDispatch, useSelector } from 'react-redux';

// Lodash
import _ from 'underscore';


export default function Breed (prop) {
    // Dispatcher
    const dispatch = useDispatch();
    const idProp  = prop.match.params;

    useEffect(() => {
        dispatch(getById({idProp}))
        //array de dependencia
    }, [dispatch])

    // State to dog and filt if the state are same or not
    const dog = useSelector(e => e,  _.isEqual)

    return (
            <div>
                {
                    // Loading Image
                    dog.loading === true ? <img src='https://reygif.com/media/1/pug-corriendo-10974.gif' alt='loading' /> 
                    :
                    // Data
                    <div>
                    <h3>name: {dog.payload[0].name}</h3>
                    <h3>height: {dog.payload[0].height}</h3>
                    <h3>weight: {dog.payload[0].weight}</h3>
                    <h3>temperament: {dog.payload[0].temperament}</h3>
                    <h3>life: {dog.payload[0].life}</h3>
                    <img src={dog.payload[0].image} alt='Dog'/>
                    </div>
                }
            </div>
    );
};
