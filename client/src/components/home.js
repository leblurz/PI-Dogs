import React, { useState, useEffect } from 'react';

// Components 
import Nav from './Nav';
import Cards from './cards';
import SearchBar from './SearchBar';
import card from './Card';

import { getDogs, getTemps, getQuery, getById } from "../actions"
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/index.js';


import {Link} from 'react-router-dom'; 
import ReactPaginate from 'react-paginate';

function Home ({payload, loading}) {

    // Dispatcher
    const dispatch = useDispatch();

    // Realizamos el fetch de las razas
    useEffect(() => {
        dispatch(getDogs())
        //array de dependencia
    }, [dispatch])

    // Seteo una constante con las razas
    const razas = useSelector((state) => state.payload, _.isEqual)

    // Seteo pag actual
    const [pageActual, setPageActual] = useState(0);

    // Logica del paginado
    const breedPerPage = 8;
    const pagesVisited = pageActual * breedPerPage;

    //paginado en render de lo que muestro, de todos los perros solo tomo lo del paginado
    const razaActual =razas.slice (pagesVisited, pagesVisited + breedPerPage) 

    // Set paginacion
    const paginacion = (pag) => {
        setPageActual(pag)
    };

    const pageCount = Math.ceil(razas.length / breedPerPage)

    const changePage = ({selected}) => {
        setPageActual(selected);
    };
    return (
        <div>
            <Nav />
            <SearchBar />
            <div>
                {
                    loading === true ? <h1>CARGANDO</h1> : <div>
                        
            <select title="Alternar el orden alfabético">
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
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
                            <h3>{e.nombre}</h3>
                            <h3>{e.temperamento}</h3>
                            <h3>{e.peso}</h3>
                            <img src ={e.Image} />
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

const mapStateToProps = (state) => ({
    payload: state.payload,
    loading: state.loading
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators (actionCreators, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(Home);