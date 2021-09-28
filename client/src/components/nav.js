import React from 'react';
import '../styles/Nav.css';

// Link to
import { Link } from "react-router-dom";
import dog from '../images/dog.png';


export default function Nav () {
    return (
        <header>
            <div className='navigation'>
                <Link to='/home'>
                    <img className='logo' src={dog} alt='Logo'/>
                </Link>
                <nav>
                    <Link to='/home'>
                    <li>
                        Home
                    </li>
                    </Link>
                    <Link to='/form'>
                    <li>
                        Form
                    </li>
                    </Link>
                </nav>
            </div>
        </header>
    );
};