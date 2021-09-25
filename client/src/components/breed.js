import React, { useState, useEffect } from 'react';

// Components 
import Nav from '../components/nav';
import Cards from '../components/cards';
import Filter from './filter';
import Sort from './sort'
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
                    <h3>{dog.payload[0].nombre}</h3>
                    <h3>{dog.payload[0].altura}</h3>
                    <h3>{dog.payload[0].peso}</h3>
                    <h3>{dog.payload[0].temperamento}</h3>
                    <h3>{dog.payload[0].vida}</h3>
                    <img src={dog.payload[0].Image}/>
                    </div>
                }
            </div>
        </>
    );
};
