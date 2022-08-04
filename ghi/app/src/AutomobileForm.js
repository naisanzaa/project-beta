import React from "react";

class AutomobileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      year: "",
      vin: "",
      model_id: "",
      models: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const modelUrl = "http://localhost:8100/api/models/";
    const modelResponse = await fetch(modelUrl);
    const { models } = await modelResponse.json();
    let names = [];
    models.forEach((model) => {
      names.push(model);
    });
    this.setState({ ...this.state, models: names });
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
    delete data.models;
    console.log(data);

    const automobileUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(automobileUrl, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();
      console.log(newAutomobile);

      const cleared = {
        color: "",
        year: "",
        vin: "",
        model: "",
      };
      this.setState(cleared);
    }
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new automobile</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  value={this.state.color}
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="Year"
                  required
                  type="text"
                  name="year"
                  id="year"
                  value={this.state.year}
                  className="form-control"
                />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="VIN"
                  required
                  type="text"
                  name="vin"
                  id="vin"
                  value={this.state.vin}
                  className="form-control"
                />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={this.state.model}
                  onChange={this.handleChange}
                  required
                  name="model_id"
                  id="model_id"
                  className="form-select"
                >
                  <option value="">Choose a vehicle model</option>
                  {this.state.models.map((model) => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AutomobileForm;
