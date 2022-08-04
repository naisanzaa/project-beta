import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ServiceAppointmentList from "./ServiceAppointmentList";
import TechnicianForm from "./TechnicianForm";
import ServiceAppointmentForm from "./ServiceAppointmentForm";
import ServiceAppointmentHistory from "./ServiceAppointmentHistory";
import CustomerForm from "./CustomerForm";
import SalesStaffForm from "./SalesStaffForm";
import SalesList from "./SalesList";
import SalesRecordForm from "./SalesRecordForm";
import SalesHistory from "./SalesHistory";
import ManufacturerList from "./ManufacturerList";
import ManufacturerForm from "./ManufacturerForm";
import VehicleModelForm from "./VehicleModelForm";
import VehicleModelList from "./VehicleModelList";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/new/" element={<TechnicianForm />} />
          <Route path="service-appointments/">
            <Route path="" element={<ServiceAppointmentList />} />
            <Route path="new" element={<ServiceAppointmentForm />} />
            <Route path="history" element={<ServiceAppointmentHistory />} />
          </Route>
          <Route path="customers/new/" element={<CustomerForm />} />
          <Route path="salestaffs/new/" element={<SalesStaffForm />} />
          <Route path="sales/">
            <Route path="" element={<SalesList />} />
            <Route path="new" element={<SalesRecordForm />} />
            <Route path="history" element={<SalesHistory />} />
          </Route>
          <Route path="manufacturers/">
            <Route path="" element={<ManufacturerList />} />
            <Route path="new/" element={<ManufacturerForm />} />
          </Route>
          <Route path="models/">
            <Route path="" element={<VehicleModelList />} />
            <Route path="new/" element={<VehicleModelForm />} />
          </Route>
          <Route path="manufacturers/">
            <Route path="" element={<ManufacturerList />} />
            <Route path="new/" element={<ManufacturerForm />} />
          </Route>
          <Route path="models/">
            <Route path="" element={<VehicleModelList />} />
            <Route path="new/" element={<VehicleModelForm />} />
          </Route>
          <Route path="automobiles/">
            <Route path="" element={<AutomobileList />} />
            <Route path="new/" element={<AutomobileForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
