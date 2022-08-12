import React from "react";

class SalesRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auto: "",
      autos: [],
      sales_staff: "",
      sales_staffs: [],
      customer: "",
      customers: [],
      price: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchData(url, objectKey) {
    const jsonResponse = await fetch(url);
    const jsonData = await jsonResponse.json();
    let arrayObject = [];
    jsonData[objectKey].forEach((obj) => {
      arrayObject.push(obj);
    });
    this.setState({ ...this.state, [objectKey]: arrayObject });
  }

  async componentDidMount() {
    // const autosUrl = "http://localhost:8100/api/automobiles/";
    // const autosResponse = await fetch(autosUrl);
    // const { autos } = await autosResponse.json();
    // let vins = [];
    // autos.forEach((auto) => {
    //   vins.push(auto);
    // });
    // this.setState({ ...this.state, autos: vins });
    this.fetchData("http://localhost:8100/api/automobiles/", "autos");

    // const salesStaffsUrl = "http://localhost:8090/api/salesstaffs/";
    // const salesStaffsResponse = await fetch(salesStaffsUrl);
    // const { sales_staffs } = await salesStaffsResponse.json();
    // let names = [];
    // sales_staffs.forEach((sales_staff) => {
    //   names.push(sales_staff);
    // });
    // this.setState({ ...this.state, sales_staffs: names });
    this.fetchData("http://localhost:8090/api/salesstaffs/", "sales_staffs");

    // const customersUrl = "http://localhost:8090/api/customers/";
    // const customersResponse = await fetch(customersUrl);
    // const { customers } = await customersResponse.json();
    // let customerNames = [];
    // customers.forEach((customer) => {
    //   customerNames.push(customer);
    // });
    // this.setState({ ...this.state, customers: customerNames });
    this.fetchData("http://localhost:8090/api/customers/", "customers");
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
    delete data.autos;
    delete data.sales_staffs;
    delete data.customers;
    console.log(data);

    const salesRecordUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(salesRecordUrl, fetchConfig);
    if (response.ok) {
      const newSalesRecord = await response.json();
      console.log(newSalesRecord);

      const cleared = {
        auto: "",
        sales_staff: "",
        customer: "",
        price: "",
      };
      this.setState(cleared);
    }
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale </h1>
            <form onSubmit={this.handleSubmit} id="create-sales-record-form">
              <div className="form-floating mb-3">
                <select
                  value={this.state.auto}
                  onChange={this.handleChange}
                  required
                  name="auto"
                  id="auto"
                  className="form-select"
                >
                  <option value="">Choose an automobile</option>
                  {this.state.autos.map((auto) => {
                    return (
                      <option key={auto.vin} value={auto.vin}>
                        {auto.vin}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={this.state.sales_staff}
                  onChange={this.handleChange}
                  required
                  name="sales_staff"
                  id="sales_staff"
                  className="form-select"
                >
                  <option value="">Choose a sales staff</option>
                  {this.state.sales_staffs.map((sales_staff) => {
                    return (
                      <option key={sales_staff.id} value={sales_staff.id}>
                        {sales_staff.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={this.state.customer}
                  onChange={this.handleChange}
                  required
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option value="">Choose a customer</option>
                  {this.state.customers.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="Sale price"
                  required
                  type="number"
                  name="price"
                  id="price"
                  value={this.state.price}
                  className="form-control"
                />
                <label htmlFor="price">Sale price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesRecordForm;
