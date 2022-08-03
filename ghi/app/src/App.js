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
            {/* <Route path='history' element={<SalesHistory />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
