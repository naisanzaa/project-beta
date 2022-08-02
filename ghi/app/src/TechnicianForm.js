import React, {useState} from "react";

export default function TechnicianForm() {
    const [technician, setTechnician] = useState({
        name: '',
        employee_number: '',
    });
    const handleChange = (event) => {
        setTechnician({...technician, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(technician);
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(technician),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const technicianUrl = 'http://localhost:8080/api/technicians/'
        const res = fetch(technicianUrl, fetchConfig)
        if (res.ok) {
            const newTechnician = res.json()
            console.log(newTechnician)

            setTechnician({ name: '', employee_number: '' });
        };
    };
    return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Register a new Technician</h1>
                        <form onSubmit={handleSubmit} id="create-technician-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleChange}
                                    placeholder="Technician Name" required type="text" name='name' 
                                    id="name" className="form-control" value={technician.name} />
                                <label htmlFor="name">Technician Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleChange} 
                                    placeholder="Employee Number" required type="number" name='employee_number' 
                                    id="employee_number" className="form-control" value={technician.employee_number} />
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
};