import React, { useState } from 'react';
import '../styles/Landing.css';

// Link to
import { Link } from "react-router-dom";

// Imagen
import dog from '../images/dog.png';

export default function Landing () {
    return (
        <div>
            <Link to='/home'>
                <img src={dog} />
            </Link>
        </div>
    );
};

