import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentList from './ServiceAppointmentList';
import TechnicianForm from './TechnicianForm';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentHistory from './ServiceAppointmentHistory';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='technicians/new/' element={<TechnicianForm />} />
          <Route path='service-appointments/' >
            <Route path='' element={<ServiceAppointmentList />} />
            <Route path='new' element={<ServiceAppointmentForm />} />
            <Route path='history' element={<ServiceAppointmentHistory />} />
          </Route>
          <Route path='manufacturers/'>
            <Route path='' element={<ManufacturerList />} />
            <Route path='new/' element={<ManufacturerForm />} />
          </Route>
          <Route path='models/'>
            <Route path='' element={<VehicleModelList />} />
            <Route path='new' element={<VehicleModelForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
