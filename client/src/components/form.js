import React, { useState } from 'react';
import '../styles/Form.css';


// Components
import Nav from './Nav';

import { useDispatch, useSelector } from 'react-redux';

import { postNewDog } from "../actions/index"

export default function Form (props) {
    const dispatch = useDispatch()

    const [err, setErr] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        temperament: '',
        life: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (err.name === '' ||
            err.heightMin === '' ||
            err.heightMax === '' ||
            err.weightMin === '' ||
            err.weightMax === '' ||
            err.temperament === '' ||
            err.life === '') return (
                alert('Falta completar algun campo obligatorio')
            )
        dispatch(postNewDog({
            name: dogo.name,
            height: dogo.heightMin + ' ' + '-' + ' ' + max.heightMax,
            weight: dogo.weightMin +  ' ' + '-' + ' ' + max.weightMax,
            temperament: dogo.temperament,
            life: dogo.life,
            image: dogo.image
        }))
        alert("La nueva raza fue creada de manera satisfactoria");
        setDogo({
            name : '',
            height : '',
            weight : '',
            temperament : '',
            life : '',
            Image :'',  
        })
        props.history.push('/home')
    }

    const [max, setMax] = useState({
        heightMax: '',
        weightMax: ''
    });

    const [dogo, setDogo] = useState({
        name: '',
        heightMin : '',
        weightMin : '',
        temperament : '',
        life : '',
        image :'',  
    })

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
        <>
        <Nav/>
        
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
        </>
    );
    
};