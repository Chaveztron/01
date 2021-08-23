import React from 'react';
import './App.css';
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

import Pacientes from './containers/Pacientes'


function App() {

  
  


  return (
    <BrowserRouter>
      <NavLink to='/pacientes' activeClassName='active'><button>Pacientes</button></NavLink>
      
    <Route path='/' render={(props)=> <Pacientes {...props} />} />
  </BrowserRouter>
  );
}

export default App;
