import React from 'react';
import '../styles/Card.css';

// Link to
import { Link } from "react-router-dom";

export default function Card () {
    return (
        <Link to='/race'>
        <div>
            Imagen
            Nombre
            Temperamento 
            Peso
        </div>
        </Link>
    );
};