import '../styles/App.css';
import React from 'react';
import ReactDOM from 'react-dom';

// Browser route
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Components
import Landing from '../components/landing.js';
import Home from '../components/home';
import Breed from '../components/breed';
import Form from '../components/form'

function App() {
  return (
    <Router>

      <Route exact path='/'>
        <Landing />
      </Route>

      <Route path='/home'>
        <Home />
      </Route>

      <Route path='/breed/:id' component={Breed}/>

      <Route path='/form'>
        <Form />
      </Route>
      
    </Router>
  );
};

export default App;
