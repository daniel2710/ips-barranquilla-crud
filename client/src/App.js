import { Fragment } from 'react';
import {  BrowserRouter,Routes,Route } from 'react-router-dom';
// components
import Navbar from "./components/Navbar";
import Citas from "./components/Citas";
import Pacientes from './components/Pacientes';
// context
import {FindByIdProvider} from './context/FindByIdPaciente'; 
import HistorialCitas from './components/HistorialCita';
//Styles
import './styles/app.scss';

function App() {
  return (
    <Fragment>
    <FindByIdProvider>
      <BrowserRouter>
          <Navbar/>
            <Routes>

              <Route path="/" exact element={<Citas/>}/>
              {/* privateRoute - dashboard */}
              <Route path="/pacientes" exact element={<Pacientes/>}/>

              <Route path="/historial/citas" exact element={<HistorialCitas/>}/>
              
            </Routes>
        </BrowserRouter>
      </FindByIdProvider>
    </Fragment>
  );
}

export default App;
