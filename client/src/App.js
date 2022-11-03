import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import VehicleList from './components/VehicleList';
import VehicleInfo from './components/VehicleInfo';
import VehicleEdit from './components/VehicleEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import VehicleForm from './components/VehicleForm';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<VehicleList/>} path="/" default/>
          <Route element={<VehicleForm/>} path="/vehicle/new"/>
          <Route element={<VehicleInfo/>} path="/vehicle/:id"/>
          <Route element={<VehicleEdit/>} path="/vehicle/:id/edit"/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
