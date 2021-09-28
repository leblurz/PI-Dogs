import React, { useState } from 'react';
import '../styles/Form.css';

import { useDispatch } from 'react-redux';

// Action Creator
import { postNewDog } from "../actions/index"

export default function Form (props) {
    const dispatch = useDispatch()

    // Error
    const [err, setErr] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        temperament: '',
        life: '',
    });

    // Submit
    function handleSubmit(e) {
        e.preventDefault();
        // Error case
        if (err.name === '' ||
            err.heightMin === '' ||
            err.heightMax === '' ||
            err.weightMin === '' ||
            err.weightMax === '' ||
            err.temperament === '' ||
            err.life === '') return (
                alert('Falta completar algun campo obligatorio')
            )
        // Const for concat evititing warnings
        const guion = '-';
        const space = ' ';
        dispatch(postNewDog({
            name: dogo.name.replace(/^\w/, (c) => c.toUpperCase()),
            height: dogo.heightMin + space + guion + space + max.heightMax,
            weight: dogo.weightMin + space + guion + space + max.weightMax,
            temperament: dogo.temperament,
            life: dogo.life,
            image: dogo.image
        }))
        // Succes
        alert("La nueva raza fue creada de manera satisfactoria");
        // Set blank inputs
        setDogo({
            name : '',
            height : '',
            weight : '',
            temperament : '',
            life : '',
            Image :'',  
        })
        // Redirect
        props.history.push('/home')
    }

    // State to max
    const [max, setMax] = useState({
        heightMax: '',
        weightMax: ''
    });

    // State + state to min
    const [dogo, setDogo] = useState({
        name: '',
        heightMin : '',
        weightMin : '',
        temperament : '',
        life : '',
        image :'',  
    })

    // Set whit changes
    function handleChange(e){
        setDogo({
            ...dogo,
            [e.target.name] : e.target.value
        })
        setErr({
            ...err,
            [e.target.name] : e.target.value
        })
    }

    // Set max whit changes
    function handleChangeMax(e){
        setMax({
            ...max,
            [e.target.name] : e.target.value
        })
        setErr({
            ...err,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <form>
                <label>Nombre: </label>
                <input required type="text" value={dogo.name} name="name" onChange={e => handleChange(e)}/>

                <input required type="number"
                name="life" 
                id="life" 
                min="1" max="30" 
                step="1" 
                placeholder='Life...'
                value={dogo.life}
                onChange={e => handleChange(e)} 
                />

                <input required type="number" 
                name="heightMin" 
                id="heightMin" 
                min="1" max="200" 
                step="1"
                value={dogo.height}
                placeholder='Height min(CM)...'
                onChange={e => handleChange(e)}
                />

                <input required type="number" 
                name="heightMax" 
                id="heightMax" 
                min="1" max="200" 
                step="1"
                value={max.heightMax}
                placeholder='Height max(CM)...'
                onChange={e => handleChangeMax(e)}
                />

                <input required type="number" 
                name="weightMin" 
                id="weightMin" 
                min="1" max="80" 
                step="1"
                placeholder='Weight min(KG)...'
                value={dogo.weight}
                onChange={e => handleChange(e)}
                />

                <input required type="number" 
                name="weightMax" 
                id="weightMax" 
                min="1" max="200" 
                step="1"
                value={max.weightMax}
                placeholder='Height max(CM)...'
                onChange={e => handleChangeMax(e)}
                />

                <label>Temperament/s: </label>
                <input required type="text" value={dogo.temperament} name="temperament" onChange={e => handleChange(e)}/>

                <input type="text" 
                value={dogo.image} 
                name="image" 
                onChange={e => handleChange(e)}
                placeholder='URL Image...'
                />

            </form>
            <input type='submit' onClick={e=>handleSubmit(e)}/>
        </div>
    );
    
};