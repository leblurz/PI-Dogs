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
        console.log(err)
        // Error case
        if (err.name === '' || 
            err.heightMin === '' ||
            err.heightMax === '' || 
            err.weightMin === '' ||
            err.weightMax === '' ||
            err.temperament === '' ||
            err.life === '') return (
                alert('All fields whit * need to be completed')
            )
        if (parseInt(err.heightMin)> parseInt(err.heightMax)) {
            return (
                alert('Wrong height')
            )
        }
        if (parseInt(err.weightMin) > parseInt(err.weightMax)) {
            return (
                alert('Wrong weight')
            )
        }
        if (parseInt(err.temperament)) {
            return (
                alert ('Temperaments shoul be be a string')
            )
        }
        if (parseInt(err.life > 50) || parseInt(err.life) <= 0) {
            return (
                alert('Is too old or young to die, dont you think?')
            );
        }
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
        alert("Successfully created");
        // Set blank inputs
        setDogo({
            name : '',
            height : '',
            weight : '',
            temperament : '',
            life : '',
            image :'',  
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
        <div className='contContainer'>
            <form className='containerForm'>
                <div>
                    <label>Name: </label>
                    <input required 
                    className='placeHolder' 
                    type="text" 
                    value={dogo.name} 
                    placeholder='* Name...'
                    name="name" 
                    onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <input required type="number"
                    name="life" 
                    id="life" 
                    min="1" max="30" 
                    step="1"
                    className='placeHolder'
                    placeholder='* Life...'
                    value={dogo.life}
                    onChange={e => handleChange(e)} 
                    />
                </div>
                <div>
                    <input required type="number" 
                    name="heightMin" 
                    id="heightMin"
                    className='placeHolder'
                    min="1" max="200" 
                    step="1"
                    value={dogo.height}
                    placeholder='* Height min(CM)...'
                    onChange={e => handleChange(e)}
                    />
                    <input required type="number" 
                    name="heightMax"
                    className='placeHolder'
                    id="heightMax" 
                    min="1" max="200" 
                    step="1"
                    value={max.heightMax}
                    placeholder='* Height max(CM)...'
                    onChange={e => handleChangeMax(e)}
                    />
                </div>
                <input required type="number" 
                name="weightMin"
                className='placeHolder'
                id="weightMin" 
                min="1" max="80" 
                step="1"
                placeholder='* Weight min(KG)...'
                value={dogo.weight}
                onChange={e => handleChange(e)}
                />

                <input required type="number" 
                name="weightMax"
                className='placeHolder'
                id="weightMax" 
                min="1" max="200" 
                step="1"
                value={max.weightMax}
                placeholder='* Height max(KG)...'
                onChange={e => handleChangeMax(e)}
                />

                <div>
                    <label>Temperament/s: </label>
                    <input required type="text" 
                    value={dogo.temperament} 
                    name="temperament"
                    className='placeHolder'
                    placeholder='* Temperaments...' 
                    onChange={e => handleChange(e)}/>
                </div>

                <input type="text" 
                value={dogo.image} 
                name="image"
                className='placeHolder'
                onChange={e => handleChange(e)}
                placeholder='URL Image...'
                />
            </form>
            <div className='containerbtSub'>
                <input className='btnSub' type='submit' onClick={e=>handleSubmit(e)}/>
            </div>
        </div>
    );
    
};