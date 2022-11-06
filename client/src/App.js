import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import VehicleList from './components/VehicleList';
import VehicleInfo from './components/VehicleInfo';
import VehicleEdit from './components/VehicleEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import VehicleForm from './components/VehicleForm';
import VehicleCosmetics from './components/VehicleCosmetics';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<VehicleList/>} path="/" default/>
          <Route element={<VehicleForm/>} path="/vehicle/new"/>
          <Route element={<VehicleInfo/>} path="/vehicle/:id"/>
          <Route element={<VehicleEdit/>} path="/vehicle/:id/edit"/>
          <Route element={<VehicleCosmetics/>} path="/vehicle/:id/cosmetic"/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
