import React from 'react';

// Link to
import { Link } from "react-router-dom";

// Components 
import Nav from '../components/nav';
import Cards from '../components/cards';
import Filter from './filter';
import Sort from './sort'

export default function Home () {
    return (
        <>
            <Nav />
            <input placeholder='Raza...'/>
            {/* pasarle argumento de card */}
            <Cards />
            <Filter />
            <Sort />
            <div>
                <p>
                    PAGINADO
                </p>
            </div>
        </>
    );
};