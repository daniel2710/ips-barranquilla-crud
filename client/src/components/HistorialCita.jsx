import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/citas.scss';
import HeaderHistorial from './HeaderHistorial';

// context
import { FindByIdPaciente } from '../context/FindByIdPaciente';


const HistorialCitas = () => {

    // context
    const {contextData} = useContext(FindByIdPaciente);

    // endpoint para obtener todos los datos
    const getPacienteUrl = `http://localhost:9000/ipsbarranquilla/pacientes/${contextData.idpaciente.idpaciente}`;

    const getAllCitas = `http://localhost:9000/ipsbarranquilla/citas/${contextData.idpaciente.idpaciente}`


  // USAMOS EL HOOK USESTATE PARA TRAER LA DATA Y REALIZAR LAS DIFERENTES OPERACIONES EN EL FRONT
  const [data, setData] = useState([]);
  const [citas, setCitas] = useState([]);
  const [ultima, setUltima] = useState([]);

  // PETICIONES
  const getPacientes=()=>{
    setTimeout(() => {
      axios.get(getPacienteUrl)
      .then(response=>{
        setData(response.data)
      })
      .catch((error)=> console.log(error))
    }, 150)
  }

  const getCitas=()=>{
    axios.get(getAllCitas)
    .then(response=>{
      let allCitas = response.data;
      let array = allCitas.pop()
      setCitas(allCitas)
      setUltima(array)
    })
    .catch((error)=> console.log(error))
  }

  useEffect(() => {
    getPacientes()
    getCitas()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <HeaderHistorial/>
    <div className='container citas'>
        <div className='mb-4'>
            <h3>Paciente</h3>
        </div>
        <div className='mt-4'>
        {data.length > 0 ? <table id='table' className='table'>
                    <thead>
                        <tr className=''>
                            <th>Id</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Tipo Documento</th>
                            <th>Documento</th>
                            <th>Fecha Nacimiento</th>
                            <th>Lugar Nacimiento</th>
                        </tr>
                    </thead>

                <tbody>
                    {data.map(paciente=>{
                        return(
                        <tr className='text-uppercase' key={paciente.idpaciente}>
                          <td>{paciente.idpaciente}</td>
                          <td>{paciente.nombres}</td>
                          <td>{paciente.apellidos}</td>
                          <td>{paciente.tipo_doc}</td>
                          <td>{paciente.documento}</td>
                          <td>{paciente.fecha_nac}</td>
                          <td>{paciente.lugar_nac}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table> : <h1>'No has eligido ningun paciente'</h1>}
        </div>

        <div className='mt-4 mb-4'>
            <h4>Ultima Cita</h4>
        </div>

        <div className='mt-4'>
        {data.length > 0 ? <table id='table' className='table table-striped'>
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
                        </tr>
                    </thead>

                <tbody>
                      <tr className='text-uppercase' key={ultima.idcita}>
                          <td>{ultima.idcita}</td>
                          <td>{ultima.fecha}</td>
                          <td>{ultima.hora}</td>
                          <td>{ultima.lugar}</td>
                          <td>{ultima.direccion}</td>
                          <td>{ultima.doctor}</td>
                          <td className={ultima.estado === 'terminada' ? 'text-info' : 'bg-warning'}>{ultima.estado}</td>
                          <td>{ultima.tipo}</td>
                          <td className={ultima.prioritaria === 'si' ? 'bg-success' : 'bg-warning'}>
                            {ultima.prioritaria}
                          </td>
                          <td>{ultima.observacion}</td>
                        </tr>

                </tbody>
            </table> : <h1>No disponible</h1>}
            </div>

        <div className='mt-4 mb-4'>
            <h4>Historial</h4>
        </div>

        <div className='mt-4'>
        {data.length > 0 ? <table id='table' className='table table-striped'>
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
                        </tr>
                    </thead>

                <tbody>
                    {citas.map(cita=>{
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
                        </tr>
                        )
                    })}
                </tbody>
            </table> : <h1>No disponible</h1>}
            </div>

    </div>
    </>
  )
}

export default HistorialCitas;