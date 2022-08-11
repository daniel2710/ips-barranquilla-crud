import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import SpinnerLoading from './SpinnerLoading';
// React Icons
import {GoDiffAdded} from 'react-icons/go';
import {FaUserEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
// AXIOS
import axios from 'axios';
// sweetAlert2 para alertas
import Swal from 'sweetalert2';
import HeaderPacientes from './HeaderPacientes';
// librerias para exportar pdf y excel
import jsPDF from "jspdf";
import "jspdf-autotable";
// styles
import '../styles/citas.scss';


// endpoint para obtener todos los datos
const getAllPacientes = "http://localhost:9000/ipsbarranquilla/pacientes";
const updatePaciente = "http://localhost:9000/ipsbarranquilla/updatepaciente/";
const deletePacienteUrl = "http://localhost:9000/ipsbarranquilla/deletepaciente/";
const addCitaUrl = "http://localhost:9000/ipsbarranquilla/addcitas";
const getAllCitas = "http://localhost:9000/ipsbarranquilla/citas";


const Pacientes = () => {

  // USAMOS EL HOOK USESTATE PARA TRAER LA DATA Y REALIZAR LAS DIFERENTES OPERACIONES EN EL FRONT
  const [data, setData] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [dataCita, setDataCita] = useState([]);

  // Filtrado state
  const [filtrarDoc, setFiltrarDoc] = useState("");

  // HOOK USESTATE PARA CUANDO SELECCIONEMOS UN REGISTRO (SELECCIONAR UN DATA EN ESPECIFICO PARA LUEGO REALIZAR ALGUNA FUNCION)
  const [seleccionado, setSeleccionado] = useState({})

  // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL
  const [modalEliminar, setModalEliminar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalCita, setModalCita]=useState(false);

  // SI MODALINSERTAR ES TRUE SE ABRE LA VENTANA MODAL   
  const abrirModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  const abrirModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirModalCita=()=>{
    setModalCita(!modalCita);
  }

  const pacienteSeleccionado=(paciente, caso)=>{
    setSeleccionado(paciente);
    (caso === "Eliminar")&&abrirModalEliminar();
    (caso === "Editar"&&abrirModalEditar());
    (caso === "Cita"&&abrirModalCita());
    console.log(seleccionado);
  }

  // funcion para capturar el valor del input
  const handleChange=e=>{
    // se acdestructura para acceder al name y value del input
    const {name, value} = e.target;
    // prevState Lo que contiene es el valor del estado anterior
    setSeleccionado(prevState=>({
      // spread operator para hacer copia de prevState y le pasamos al name el value
      ...prevState,
      [name]: value
    }))
  }

  const [seleccionadoCita, setSeleccionadoCita] = useState({
    estado: 'pendiente',
    tipo: 'presencial',
    observacion: 'niguna'
  })


  const handleChangeCita=e=>{
    // se acdestructura para acceder al name y value del input
    const {name, value} = e.target;
    // prevState Lo que contiene es el valor del estado anterior
    let id = seleccionado.idpaciente;
    setSeleccionadoCita(prevState=>({
      // spread operator para hacer copia de prevState y le pasamos al name el value
      ...prevState,
      [name]: value,
      idpaciente: id
    }));
  }

  // metodo de filtrado
  let resultadosFiltrados = [];
  const filtradorDoc = (e) =>{
    setFiltrarDoc(e.target.value)
  }
  
  // si filtrarFecha es diferente a: "" , 'no sucede nada' (el array sera igual a la data oficial)
  if(!filtrarDoc){
    resultadosFiltrados = data;
  }else{
  // si no , será modificado el array y sera filtrado por la fecha que este en el state (El método includes determina si una cadena de texto puede ser encontrada dentro de otra cadena de texto, devolviendo true o false según cor)
  resultadosFiltrados = data.filter((paciente)=>
    paciente.documento.toLowerCase().includes(filtrarDoc.toLocaleLowerCase())
  )}

  // para exportar a pdf
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
  
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  
    doc.setFontSize(15);
  
    const title = "REGISTRO DE PACIENTES";
    const headers = [["NOMBRES", "APELLIDOS", "TIPO DOCUMENTO", "DOCUMENTO", "FECHA NACIMIENTO", "LUGAR NACIMIENTO"]];
  
    const datos = resultadosFiltrados.map(item => [item.nombres, item.apellidos, item.tipo_doc, item.documento, item.fecha_nac, item.lugar_nac]);
  
    let content = {
      startY: 100,
      head: headers,
      body: datos
    };
  
    doc.text(title, marginLeft, 50);
    doc.autoTable(content);
    doc.save("reporte.pdf")
  }

  // PETICIONES
  const peticionGet=()=>{
    setTimeout(() => {
      axios.get(getAllPacientes)
      .then(response=>{
        setData(response.data)
      })
      .catch((error)=> console.log(error))
    }, 150)
  }

  const putPaciente=async()=>{
    await axios.put(updatePaciente+seleccionado.idpaciente, seleccionado)
    .then(()=>{
      let dataNueva=data;
      // eslint-disable-next-line array-callback-return
      dataNueva.map(paciente =>{
        if(seleccionado.idpaciente===paciente.idpaciente){
          paciente.nombres=seleccionado.nombres;
          paciente.apellidos=seleccionado.apellidos;
          paciente.tipo_doc=seleccionado.tipo_doc;
          paciente.documento=seleccionado.documento;
          paciente.fecha_nac=seleccionado.fecha_nac;
          paciente.lugar_nac=seleccionado.lugar_nac;
        }
        setSeleccionado('')
      })
      setData(dataNueva);
      abrirModalEditar();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Paciente Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const deletePaciente=async()=>{
    await axios.delete(deletePacienteUrl+seleccionado.idpaciente)
    .then(()=>{
      setData(data.filter(paciente=>paciente.idpaciente!==seleccionado.idpaciente));
      abrirModalEliminar();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Paciente Eliminado',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const getCitas=()=>{
      axios.get(getAllCitas)
      .then(response=>{
          setDataCita(response.data)
      })
      .catch((error)=> console.log(error))
  }
  
    useEffect(() => {
      getCitas()
    }, []);

  const addCita=async(e)=>{
    e.preventDefault()
    await axios.post(addCitaUrl, seleccionadoCita)
    .then(response=>{
        setDataCita(data.concat(response.data))
        abrirModalCita()
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cita Agregada, actualice para ver cambios',
            showConfirmButton: false,
            timer: 2500
        })
      })
    setSeleccionado('')
  }

  useEffect(() => {
    peticionGet()
  }, []);

  return (
    <>
    <HeaderPacientes/>
    <div className='container citas'>
        <div className='mb-4 d-flex justify-content-between p-2'>
            <h3>Listado de pacientes</h3>
            <div>
              <button onClick={exportPDF} className='btn btn-sm btn-primary'>Generar reporte</button>
            </div>
            <div className='d-flex align-items-center'>
              <span className=''>Filtrar por documento</span>
              <input type='number' value={filtrarDoc} onChange={filtradorDoc}  min={10000} className='form-control text-dark' />
            </div>
        </div>
        <div className='table-div mt-4'>
        {data.length > 0 ? <table id='table' className='table table-striped'>
                    <thead>
                        <tr className=''>
                            <th>Id</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Tipo Documento</th>
                            <th>Documento</th>
                            <th>Fecha Nacimiento</th>
                            <th>Lugar Nacimiento</th>
                            <th>Añadir Cita</th>
                            <th>Editar Datos</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                <tbody>
                    {resultadosFiltrados.map(paciente=>{
                        return(
                        <tr className='text-uppercase' key={paciente.idpaciente}>
                          <td>{paciente.idpaciente}</td>
                          <td>{paciente.nombres}</td>
                          <td>{paciente.apellidos}</td>
                          <td>{paciente.tipo_doc}</td>
                          <td>{paciente.documento}</td>
                          <td>{paciente.fecha_nac}</td>
                          <td>{paciente.lugar_nac}</td>
                          <td onClick={()=>pacienteSeleccionado(paciente, "Cita")}> <GoDiffAdded/></td>
                          <td onClick={()=>pacienteSeleccionado(paciente, "Editar")}> <FaUserEdit/></td>
                          <td onClick={()=>pacienteSeleccionado(paciente, "Eliminar")}><RiDeleteBin6Fill/></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table> : <SpinnerLoading/>}
        </div>
    </div>

    {/* MODAL PARA EDITAR PACIENTES */}
    <Modal isOpen={modalEditar}>
    <ModalBody>
      <div className="form-group">
          <h3>EDITAR PACIENTE</h3>
          <br/>
          <label>Editar Nombres</label>
            <input onChange={handleChange} value={seleccionado && seleccionado.nombres} name="nombres" className="form-control" type="text"/>
          <br/>
          <label>Editar Apellidos</label>
            <input onChange={handleChange} value={seleccionado && seleccionado.apellidos} name="apellidos" className="form-control" type="text"/>
          <br/>
          <label>Editar Tipo De Documento</label>
            <input onChange={handleChange} value={seleccionado && seleccionado.tipo_doc} name="tipo_doc" className="form-control" type="text"/>
          <br/>
          <label>Editar Documento</label>
            <input onChange={handleChange} value={seleccionado && seleccionado.documento} name="documento" className="form-control" type="number"/>
          <br/>
          <label>Editar Fecha Nacimiento</label>
            <input onChange={handleChange} value={seleccionado && seleccionado.fecha_nac} name="fecha_nac" className="form-control" type="date" />
          <br/>
          <label>Editar Lugar Nacimiento</label>
            <input onChange={handleChange} value={seleccionado && seleccionado.lugar_nac} name="lugar_nac" className="form-control" type="text" />
          <br/>
      </div>
    </ModalBody>
      <ModalFooter>
        <button className="btn btn-info" onClick={()=>putPaciente()}>Editar</button>
        <button className="btn btn-primary" onClick={()=>abrirModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    {/* MODAL PARA ELIMINAR PACIENTE */}
    <Modal isOpen={modalEliminar}>
      <ModalBody>
          <div className="form-group">
          <p>¿ESTÁS SEGURO QUE DESEAS ELIMINAR EL REGISTRO?</p>
          </div>
      </ModalBody>
      <ModalFooter>
          <button className="btn btn-danger" onClick={()=>deletePaciente()}>Confirmar</button>
          <button className="btn btn-dark" onClick={()=>abrirModalEliminar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    {/* MODAL PARA AÑADIR CITA */}
    <Modal isOpen={modalCita}>
    <ModalBody>
      <div className="form-group">
          <h3>NUEVA CITA</h3>
          <br/>
          <form onSubmit={addCita}>
          <input className='d-none' onChange={handleChangeCita} value={seleccionado.idpaciente || ''} type='number' name='idpaciente'/>
          <label>Fecha</label>
            <input onChange={handleChangeCita} required name="fecha" className="form-control" type="date"/>
          <br/>
          <label>Hora</label>
            <input onChange={handleChangeCita} required name="hora" className="form-control" type="text"/>
          <br/>
          <label>Lugar</label>
            <input onChange={handleChangeCita} required name="lugar" className="form-control" type="text"/>
          <br/>
          <label>Direccion</label>
            <input onChange={handleChangeCita} required name="direccion" className="form-control" type="text"/>
          <br/>
          <label>Doctor(a)</label>
            <input onChange={handleChangeCita} required name="doctor" className="form-control" type="text" />
          <br/>
          <label>Estado</label>
            <input onChange={handleChangeCita} required name="estado" className="form-control" value='pendiente' type="text" />
          <br/>
          <label>Tipo</label>
            <input onChange={handleChangeCita} required name="tipo" className="form-control" value='presencial' type="text" />
          <br/>
          <label>Prioritaria</label>
            <select name='prioritaria' onChange={handleChangeCita}>
              <option value='no'>No</option>
              <option value='si'>Si</option>
            </select>
          <br/>
          <label>Observación</label>
            <input onChange={handleChangeCita} name="observación" value='ninguna' className="form-control" type='text-area' />
          <br/>

          <div className='d-flex bg-white justify-content-between'>
            <button type='submit' className="btn btn-info">Añadir Cita</button>
            <button type='button' className="btn btn-primary" onClick={abrirModalCita}>Cancelar</button>
          </div>
          </form>
      </div>
    </ModalBody>
    </Modal>

    </>
  )
}

export default Pacientes;