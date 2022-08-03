import React, {useState} from "react";

export default function ManufacturerForm() {
    const [manufacturer, setManufacturer] = useState({
        name: '',
    });

    const handleChange = (event) => {
        setManufacturer(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...manufacturer}
        console.log(data);
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const res = await fetch(manufacturerUrl, fetchConfig)
        if (res.ok) {
            const newManufacturer = res.json()
            console.log(newManufacturer)

            setManufacturer({
                    name: '',
            });
        };
    };
    return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Register a new Manufacturer</h1>
                        <form onSubmit={handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleChange}
                                    placeholder="name" required type="text" name='name' 
                                    id="name" className="form-control" value={manufacturer.name} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
};