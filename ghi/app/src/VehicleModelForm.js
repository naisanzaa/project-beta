import React, {useState, useEffect} from "react";

export default function VehicleModelForm() {
    const [vehicleModel, setVehicleModel] = useState({
        name: '',
        picture_url: '',
        manufacturers: [],
    });

    const [manufacturers, setManufacturers] = useState([]);
    const fetchManufacturers= async () => {
        const url = 'http://localhost:8100/api/manufacturers';
        const res = await fetch(url);
        const manufacturerDict = await res.json()
        if (res.ok) {
            setManufacturers(manufacturerDict.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufacturers();
    });

    const handleChange = (event) => {
        setVehicleModel({...vehicleModel, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...vehicleModel}
        delete data.manufacturers
        console.log(data);
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const vehicleModelUrl = 'http://localhost:8100/api/models//'
        const res = await fetch(vehicleModelUrl, fetchConfig)
        if (res.ok) {
            const newVehicleModel = res.json()
            console.log(newVehicleModel)

            setVehicleModel({
                    name: '',
                    picture_url: '',
                    manufacturer: '',
            });
        };
    };
    return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Register a new Vehicle Model</h1>
                        <form onSubmit={handleSubmit} id="create-vehicle-model-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleChange}
                                    placeholder="name" required type="text" name='name' 
                                    id="name" className="form-control" value={vehicleModel.name} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleChange}
                                    placeholder="picture_url" required type="text" name='picture_url' 
                                    id="picture_url" className="form-control" value={vehicleModel.picture_url} />
                                <label htmlFor="picture_url">Picture url</label>
                            </div>
                            <div className="mb-3">
                                <select required onChange={handleChange} value={vehicleModel.manufacturer}
                                    name='manufacturer' id="manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
};