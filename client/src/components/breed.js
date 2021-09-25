import React, { useState, useEffect } from 'react';

// Components 
import Nav from './Nav';
import Cards from './cards';
import SearchBar from './SearchBar'
import card from './Card';

import { getDogs, getTemps, getQuery, getById, dataById } from "../actions"
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/index.js';


import {Link} from 'react-router-dom'; 
import ReactPaginate from 'react-paginate';


// getById

export default function Breed (prop) {

    const dispatch = useDispatch();

    const {id}  = prop.match.params;

    useEffect(() => {
        dispatch(getById(id))
        //array de dependencia
    }, [dispatch])

    const dog = useSelector(e => e,  _.isEqual)
    console.log(dog)

    return (
        <>
        <Nav />
            <div>
                {
                    dog.loading === true ? <h1>CARGANDO</h1> :
                    <div>
                    <h3>name: {dog.payload[0].name}</h3>
                    <h3>height: {dog.payload[0].height}</h3>
                    <h3>weight: {dog.payload[0].weight}</h3>
                    <h3>temperament: {dog.payload[0].temperament}</h3>
                    <h3>life: {dog.payload[0].life}</h3>
                    <img src={dog.payload[0].image}/>
                    </div>
                }
            </div>
        </>
    );
};
