import { NavLink } from "react-router-dom";
import "./App.css";
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
          <img src="/images/car-solid.svg" width="20" height="20" alt="" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse nav-tabs"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto mb-5 mb-lg-1">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    to="/service-appointments/"
                  >
                    Service Appointments
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    to="/service-appointments/new/"
                  >
                    Register an Appointment
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    to="/service-appointments/history/"
                  >
                    Service History
                  </NavLink>
                </li>
                <div className="dropdown-divider"></div>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/technicians/new">
                    Register a Technician
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/">
                    List of Sales
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/new">
                    Create a Sale Record
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/history">
                    Staff's Sales History
                  </NavLink>
                </li>
                <div className="dropdown-divider"></div>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/customers/new/">
                    Register a Customer
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/salestaffs/new/">
                    Register a Sales Staff
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventories
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/manufacturers">
                    Manufacturers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/manufacturers/new">
                    Register a Manufacturer
                  </NavLink>
                </li>
                <div className="dropdown-divider"></div>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/models">
                    Vehicle Models
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/models/new">
                    Register a Vehicle Model
                  </NavLink>
                </li>
                <div className="dropdown-divider"></div>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/automobiles">
                    Automobiles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/automobiles/new">
                    Register a Automobile
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
