import React from 'react';
import '../styles/Landing.css';

// Link to
import { Link } from "react-router-dom";

// Imagen
import dog from '../images/dog.png';

export default function Landing () {
    return (
        <div className='landGen'>
            <Link to='/home'>
                <div className="land">
                    <img src={dog} alt='Landing Page' />
                </div>
            </Link>
        </div>
    );
};

