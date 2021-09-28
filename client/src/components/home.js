import React, { useState, useEffect } from 'react';
import '../styles/Home.css'
// Components 
import SearchBar from './SearchBar';

// Action creators
import { getDogs, getTemps, sortBy } from "../actions"

import { useDispatch, useSelector } from 'react-redux';

// Lodash
import _ from 'underscore';

// Router
import {Link} from 'react-router-dom'; 
import ReactPaginate from 'react-paginate';

export default function Home () {

    // Dispatcher
    const dispatch = useDispatch();

    // Realizamos el fetch de las razas
    useEffect(() => {
        dispatch(getTemps());
        dispatch(getDogs());
        //array de dependencia
    }, [dispatch])

    // _.isEqual filt if the state are same or not
    // Const whit breeds
    const razas = useSelector((state) => state.payload, _.isEqual);
    // Const whit temps
    const temps = useSelector((state) => state.temperaments, _.isEqual);
    // Const whit loading
    const loading = useSelector((state) => state.loading, _.isEqual)

    // Seteo pag actual
    const [pageActual, setPageActual] = useState(0);

    // Logica del paginado
    const breedPerPage = 8;
    const pagesVisited = pageActual * breedPerPage;

    // Paginado en render de lo que muestro
    const razaActual = razas.slice (pagesVisited, pagesVisited + breedPerPage) 

    // Rounding if the breeds are an odd number
    const pageCount = Math.ceil(razas.length / breedPerPage)

    // To change page
    const changePage = ({selected}) => {
        setPageActual(selected);
    };

    // Sorting
    async function sortedBy(e) {
        e.preventDefault();
        dispatch(sortBy(e.target.value));
        await changePage(0);
        setPageActual(0);
    }

    return (
        <div>
            <div>
                {
                    loading === true ?
                    <div className='loadingDog'> 
                            <img src='https://reygif.com/media/1/pug-corriendo-10974.gif' alt='Running Dog' />
                    </div>
                    : 
                    <div>
                        <div className='seaBar'>
                            <div className='containSelect'>
                            <select className='selects' onChange={e => sortedBy(e)}>
                                <option value="default">Order by default....</option>
                                <optgroup label="Alphabetic" title="Alter alphabetically">
                                    <option value="AZ">A-Z</option>
                                    <option value="ZA">Z-A</option>
                                </optgroup>
                                <optgroup label="For Weight" title="Alter by weight">
                                    <option value="UP">UP</option>
                                    <option value="DOWN">DOWN</option>
                                </optgroup>
                                <optgroup label="From where " title="Alter by weight">
                                    <option value="API">API</option>
                                    <option value="MYDB">My DB</option>
                                </optgroup>
                                <optgroup label="Temperaments">
                                    {temps.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}
                                </optgroup>   
                            </select>
                            </div>
                            <SearchBar />
                        </div>
                        {razaActual.length > 0 ?
                        <div>
                            <div className='paginated'>
                                <ReactPaginate
                                previousLabel={"Prev"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBtn"}
                                previousClassName={"prevBtn"}
                                nextClassName={"nextBtn"}
                                disabledClassName={"paginationDis"}
                                activeClassName={"paginationActive"}
                                pageRangeDisplayed={1}
                                breakLabel={null}
                                />
                            </div>
                        <div className='containerDogo'>
                            {razaActual.map(e=>{
                                const rut = `/breed/${e.id}`
                                return (
                                    <div className='dogo'>
                                        <Link to={rut} key={e.id}>
                                            <div className='dogoImage'>
                                                <img src ={e.image} alt={e.image.alt}/>
                                            </div>
                                            <div className='dogoText'>
                                                <h2>{e.name}</h2>
                                                <h3>{e.temperament}</h3>
                                                <h3>Weight: {e.weight} KG</h3>
                                            </div>
                                        </Link>
                                    </div>
                            )})}
                        </div>
                            <div className='paginated'>
                                <ReactPaginate
                                previousLabel={"Prev"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBtn"}
                                previousClassName={"prevBtn"}
                                nextClassName={"nextBtn"}
                                disabledClassName={"paginationDis"}
                                activeClassName={"paginationActive"}
                                pageRangeDisplayed={1}
                                breakLabel={null}
                                />
                            </div>
                        </div>
                            :
                            <div className='loadingDog'>
                                <img src='https://i.pinimg.com/originals/18/0d/95/180d95834d68ad0add738b765a82c97a.gif' alt='Lost Dog' />
                            </div>
                            }
                    </div>}
            </div>
        </div>
    );
};
