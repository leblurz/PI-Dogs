import React from 'react';
import '../styles/Form.css';

// Components
import Nav from './Nav';

export default function Form () {
    return (
        <>
        <Nav/>
        
        <div>
            <form>
                <input placeholder='Form...'/>
            </form>
        </div>
        </>
    );
};