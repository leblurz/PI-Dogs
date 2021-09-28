
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQueryName } from '../actions/index';
import '../styles/seaBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [raza, setRaza] = useState("");

    // Set raza
    function handleInputChange(e) {
        e.preventDefault();
        setRaza(e.target.value);
    }

    // Submit raza
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getQueryName(raza));
    };
    
    return (
            <>
                <div className='containterInputs'>
                    <input required className="barsearch" type="text" placeholder="Search Breed..." onChange={(b)=> handleInputChange(b)} />
                    <button className="bttsearch" type="submit" title="Buscar" onClick={(e)=>handleSubmit(e)}>SEARCH</button>
                </div>
            </>
    );
};