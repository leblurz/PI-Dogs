import React from 'react';
import '../styles/Nav.css';

// Link to
import { Link } from "react-router-dom";

// Components
import Form from './form';

export default function Nav () {
    return (
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
    );
};