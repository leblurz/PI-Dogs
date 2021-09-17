import React from 'react';
import '../styles/Form.css';

// Components
import Nav from '../components/nav';

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