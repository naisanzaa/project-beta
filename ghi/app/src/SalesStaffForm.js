import React from "react";

class SalesStaffForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employee_number: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const key = event.target.name;
    const changeDict = {};
    changeDict[key] = value;
    this.setState(changeDict);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    console.log(data);

    const salesStaffUrl = "http://localhost:8090/api/salesstaffs/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(salesStaffUrl, fetchConfig);
    if (response.ok) {
      const newSalesStaff = await response.json();
      console.log(newSalesStaff);

      const cleared = {
        name: "",
        employee_number: "",
      };
      this.setState(cleared);
    }
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Register a new sales staff</h1>
            <form onSubmit={this.handleSubmit} id="create-sales-staff-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="Employee number"
                  required
                  type="text"
                  name="employee_number"
                  id="employee_number"
                  value={this.state.employee_number}
                  className="form-control"
                />
                <label htmlFor="employee_number">Employee number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesStaffForm;
