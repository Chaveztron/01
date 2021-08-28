import React from 'react';
import './App.css';
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

import Pacientes from './containers/Pacientes'

import UserState from "./context/Paciente/UserState";




function App() {


  


  return (
  <UserState>
    <BrowserRouter>
      <NavLink to='/pacientes' activeClassName='active'><button>Pacientes</button></NavLink>
      
    <Route path='/' render={(props)=> <Pacientes {...props} />} />
  </BrowserRouter>
  </UserState>
  );
}

export default App;
