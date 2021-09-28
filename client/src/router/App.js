import '../styles/App.css';
import React from 'react';

// Browser route
import { BrowserRouter as Router, Route } from "react-router-dom"

// Components
import Landing from '../components/Landing.js';
import Home from '../components/Home'
import Breed from '../components/Breed';
import Form from '../components/form'
import Nav from '../components/Nav';

function App() {
  
  return (
    <Router>
      
      <Route exact path='/'>
        <Landing />
      </Route>

      <Nav />

      <Route path='/home'>
        <Home />
      </Route>

      <Route path='/breed/:id' component={Breed}/>

      <Route path='/form' component={Form} />
      
    </Router>
  );
};

export default App;
