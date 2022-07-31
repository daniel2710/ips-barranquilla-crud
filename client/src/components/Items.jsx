import React from 'react';
import {NavLink} from 'react-router-dom';
import '../styles/items.scss';

const Items = () => {

  
  return (
    <>
        <li><NavLink to="/">Citas</NavLink></li>
        <li><NavLink to="/pacientes">Pacientes</NavLink></li>
        <li><NavLink to="/">ADMIN</NavLink></li>
    </>
  )
}

export default Items;