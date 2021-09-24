import React, { useState, useEffect } from 'react';

// Components 
import Nav from '../components/nav';
import Cards from '../components/cards';
import Filter from './filter';
import Sort from './sort'
import card from './Card';

import { getDogs, getTemps, getQuery, getById } from "../actions"
import { useDispatch, useSelector } from 'react-redux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/index.js';

import ReactPaginate from 'react-paginate';

function Home ({payload}) {

    // Dispatcher
    const dispatch = useDispatch();

    // Realizamos el fetch de las razas
    useEffect(() => {
        dispatch(getDogs())
        //array de dependencia
    }, [dispatch])

    // Seteo una constante con las razas
    const razas = useSelector((state) => state.payload)

    // Seteo pag actual
    const [pageActual, setPageActual] = useState(0);

    // Logica del paginado
    const breedPerPage = 8;
    const pagesVisited = pageActual * breedPerPage;

    //paginado en render de lo que muestro, de todos los perros solo tomo lo del paginado
    const razaActual = razas.slice(pagesVisited, pagesVisited + breedPerPage);

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
            <div>
                
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
                    return (
                        <div>
                            <h3>{e.nombre}</h3>
                            <h3>{e.temperamento}</h3>
                            <h3>{e.peso}</h3>
                            <img src ={e.Image} />
                        </div>
                    
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