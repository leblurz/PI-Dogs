import '../styles/App.css';
import React from 'react';
import ReactDOM from 'react-dom';

// Browser route
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Components
import Landing from '../components/landing.js';
import Home from '../components/home';
import Race from '../components/race';
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

      <Route path='/race'>
        <Race />
      </Route>

      <Route path='/form'>
        <Form />
      </Route>
      
    </Router>
  );
};

export default App;
