import React from 'react';
import '../styles/header.scss';

const HeaderHistorial = () => {
  return (
    <div className='header text-light container-fluid d-flex'>
        <div className='container'>
          <div className='p-2'>
            <span>Citas {'->'} consulta de citas {'->'} historial de citas</span>
            <h1>Historial de citas</h1>
          </div>
        </div>
    </div>
  )
}

export default HeaderHistorial;