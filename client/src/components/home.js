import React, { useState, useEffect } from 'react';

// Components 
import Nav from './Nav';
import SearchBar from './SearchBar';


import { getDogs, getTemps, getQuery, getById, sortBy } from "../actions"
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';


import {Link} from 'react-router-dom'; 
import ReactPaginate from 'react-paginate';

export default function Home ({payload, loading}) {

    // Dispatcher
    const dispatch = useDispatch();

    // Realizamos el fetch de las razas
    useEffect(() => {
        dispatch(getTemps());
        dispatch(getDogs());
        //array de dependencia
    }, [dispatch])

    // Seteo una constante con las razas
    const razas = useSelector((state) => state.payload, _.isEqual);
    const temps = useSelector((state) => state.temperaments, _.isEqual);

    // Seteo pag actual
    const [pageActual, setPageActual] = useState(0);
    // Logica del paginado
    const breedPerPage = 8;
    const pagesVisited = pageActual * breedPerPage;

    //paginado en render de lo que muestro, de todos los perros solo tomo lo del paginado
    const razaActual = razas.slice (pagesVisited, pagesVisited + breedPerPage) 

    const pageCount = Math.ceil(razas.length / breedPerPage)

    const changePage = ({selected}) => {
        setPageActual(selected);
    };

    async function sortedBy(e) {
        e.preventDefault();
        dispatch(sortBy(e.target.value));
        await changePage(0);
        setPageActual(0);
    }

    return (
        <div>
            <Nav />
            <SearchBar />
            <div>
                {
                    loading === true ? <h1>CARGANDO</h1> : 
                        <div>

                            <select onChange={e => sortedBy(e)}>
                                <option value="default" selected>Order by default....</option>
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
                            pageRangeDisplayed={4}
                            breakLabel={null}
                            />

                            {razaActual.map(e=>{
                                const rut = `/breed/${e.id}`
                                return (
                                    <Link to ={rut}>
                                    <div>
                                        <h3>{e.name}</h3>
                                        <h3>{e.temperament}</h3>
                                        <h3>{e.weight}</h3>
                                        <img src ={e.image} />
                                    </div>
                                    </Link>
                                )})}

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
                                pageRangeDisplayed={4}
                                breakLabel={null}
                            />
                        </div>}
            </div>
        </div>
    );
};
