import React, {useState} from 'react';
import { Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import '../styles/header.scss';
// sweetAlert2 para alertas
import Swal from 'sweetalert2';

// endpoint para obtener todos los datos
const addPaciente = "http://localhost:9000/ipsbarranquilla/addpaciente";


const HeaderPacientes = () => {

  // USAMOS EL HOOK USESTATE PARA TRAER LA DATA Y REALIZAR LAS DIFERENTES OPERACIONES EN EL FRONT
  const [data, setData] = useState([]);

  // HOOK USESTATE PARA CUANDO SELECCIONEMOS UN REGISTRO (SELECCIONAR UN DATA EN ESPECIFICO PARA LUEGO REALIZAR ALGUNA FUNCION)
  const [seleccionado, setSeleccionado] = useState({})

  // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL
  const [modalInsertar, setModalInsertar]=useState(false);

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

  // SI MODALINSERTAR ES TRUE SE ABRE LA VENTANA MODAL 
  const abrirModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const peticionPost=async(e)=>{
    e.preventDefault()
    await axios.post(addPaciente, seleccionado)
    .then(response=>{
        setData(data.concat(response.data))
        abrirModalInsertar()
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Paciente Agregado Correctamente, actualice para ver cambios',
            showConfirmButton: false,
            timer: 2500
        })
      })
    setSeleccionado('')
  }

  return (
    <>
    <div className='header text-light container-fluid d-flex'>
        <div className='container'>
          <div className='p-2 d-flex justify-content-between align-items-center'>
            <div>
              <span>Pacientes {'->'} consulta de pacientes</span>
              <h1>administrar pacientes</h1>
            </div>
            <div>
              <button onClick={()=>abrirModalInsertar()} className='btn btn-sm text-light btn-primary'>Nuevo Paciente</button>
            </div>
          </div>
        </div>
    </div>

    <Modal isOpen={modalInsertar}>
      <ModalBody>
        <div className="form-group">
            <h3>AGREGAR PACIENTE</h3>
                <form onSubmit={peticionPost}>
                  <br/>
                    <label>Nombres</label>
                    <input onChange={handleChange} required className="form-control" type="text" name="nombres" />
                    <br/>
                    <label>Apellidos</label>
                    <input onChange={handleChange} required className="form-control" type="text" name="apellidos" />
                    <br/>
                    <label>Tipo Documento</label>
                    <input onChange={handleChange} required className="form-control" type="text" name="tipo_doc" />
                    <br/>
                    <label>Documento</label>
                    <input onChange={handleChange} required className="form-control" type="number" min={10000} name="documento" />
                    <br/>
                    <label>Fecha Nacimiento</label>
                    <input onChange={handleChange} required className="form-control" type="date" name="fecha_nac" />
                    <br/>
                    <label>Lugar Nacimiento</label>
                    <input onChange={handleChange} required className="form-control" type="text" name="lugar_nac" />
                  <br/>
                <div className='flex bg-white justify-content-start'>
                    <button type='submit' className="btn btn-success m-1">Insertar</button>
                <button className="btn btn-danger m-1" onClick={()=>abrirModalInsertar()}>Cancelar</button>
              </div>
            </form>
          </div>
      </ModalBody>
    </Modal>


    </>
  )
}

export default HeaderPacientes;