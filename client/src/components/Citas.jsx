import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// react icons
import {AiFillEye} from 'react-icons/ai';
// spinner
import SpinnerLoading from './SpinnerLoading';
import axios from 'axios';
// components
import HeaderCitas from './HeaderCitas';
// context
import { FindByIdPaciente } from '../context/FindByIdPaciente';
// styles
import '../styles/citas.scss';


// endpoint para obtener todos los datos
const getAllCitas = "http://localhost:9000/ipsbarranquilla/citas";


const Citas = () => {

  //definimos el hook useNavigate en una constante
  const navigate = useNavigate()

  const {setContextData} = useContext(FindByIdPaciente);

  // USAMOS EL HOOK USESTATE PARA TRAER LA DATA Y REALIZAR LAS DIFERENTES OPERACIONES EN EL FRONT
  const [data, setData] = useState([]);

  // funcion para obtener el registro al que le queremos ver los detalles
  const registroSeleccionado=(cita)=>{
    setContextData(cita)
    navigate('/historial/citas')
  };


  // PETICIONES
  const peticionGet=()=>{
    setTimeout(() => {
      axios.get(getAllCitas)
      .then(response=>{

        setData(response.data.reverse())
      })
      .catch((error)=> console.log(error))
    }, 150)
  }

  useEffect(() => {
    peticionGet()
  }, []);

  return (
    <>
    <HeaderCitas/>
    <div className='container citas'>
        <div className='mb-4'>
            <h3>Citas proximas</h3>
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
        </div>
        <div className='table-div mt-4'>
        {data.length > 0 ? <table id='table' className='table table-striped table scroll'>
                    <thead>
                        <tr className=''>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Lugar</th>
                            <th>Direccion</th>
                            <th>Doctor(a)</th>
                            <th>Estado</th>
                            <th>Tipo</th>
                            <th>Prioritaria</th>
                            <th>Observación</th>
                            <th>Paciente</th>
                        </tr>
                    </thead>

                <tbody>
                    {data.map(cita=>{
                        return(
                        <tr className='text-uppercase' key={cita.idcita}>
                          <td>{cita.idcita}</td>
                          <td>{cita.fecha}</td>
                          <td>{cita.hora}</td>
                          <td>{cita.lugar}</td>
                          <td>{cita.direccion}</td>
                          <td>{cita.doctor}</td>
                          <td className={cita.estado === 'terminada' ? 'text-info' : 'bg-warning'}>{cita.estado}</td>
                          <td>{cita.tipo}</td>
                          <td className={cita.prioritaria === 'si' ? 'bg-success' : 'bg-warning'}>
                            {cita.prioritaria}
                          </td>
                          <td>{cita.observacion}</td>
                          <td onClick={()=>registroSeleccionado(cita)}><h5><AiFillEye/></h5></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table> : <SpinnerLoading/>}
        </div>
    </div>

    </>
  )
}

export default Citas;