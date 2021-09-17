import React, { useState } from 'react';
import s from '../styles/Landing.css';

// Link to
import { Link } from "react-router-dom";

// Imagen
import dog from '../images/dog.png';

export default function Landing () {
    return (
        <div className='landGen'>
            <Link to='/home'>
                <div className="land">
                    <img src={dog} />
                </div>
            </Link>
        </div>
    );
};

