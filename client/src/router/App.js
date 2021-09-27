import '../styles/App.css';
import React from 'react';
import ReactDOM from 'react-dom';

// Browser route
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Components
import Landing from '../components/Landing.js';
import Home from '../components/Home'
import Breed from '../components/Breed';
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

      <Route path='/form' component={Form} />
      
    </Router>
  );
};

export default App;
