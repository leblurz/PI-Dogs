
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQueryName } from '../actions/index'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [raza, setRaza] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setRaza(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getQueryName(raza))
    };
    
    return (
        <div>
            <div >
            <div><button className="bttsearch" type="submit" title="Buscar" onClick={(e)=>handleSubmit(e)}>SEARCH</button></div>
            <div><input required className="barsearch" type="text" placeholder="Introduce una raza de perro" onChange={(b)=> handleInputChange(b)} /></div>
        </div>
        </div>
    );
};