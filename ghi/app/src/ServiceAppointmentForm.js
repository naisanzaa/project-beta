import React, {useEffect, useState} from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default function ServiceAppointmentForm() {
    const [serviceAppointment, setServiceAppointment] = useState({
        VIN: '',
        owner: '',
        date_time: new Date(),
        technicians: [],
        reason: '',
    });

    const [technicians, setTechnicians] = useState([]);
    const fetchTechnicians= async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const res = await fetch(url);
        const technicianDict = await res.json()
        if (res.ok) {
            setTechnicians(technicianDict.technicians)
        }
    }

    const [date, setDate] = useState('');
    const handleChangeDate = (date) => setDate(date)



    useEffect(() => {
        fetchTechnicians();
    });

    const handleChange = (event) => {
        setServiceAppointment({...serviceAppointment, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...serviceAppointment}
        data.date_time = date
        delete data.technicians
        console.log(data);
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const serviceAppointmentUrl = 'http://localhost:8080/api/service-appointments/'
        const res = await fetch(serviceAppointmentUrl, fetchConfig)
        if (res.ok) {
            const newServiceAppointment = res.json()
            console.log(newServiceAppointment)

            setServiceAppointment({
                    VIN: '',
                    owner: '',
                    date_time: '',
                    technician: '',
                    reason: '',
            });
            setDate({date_time: ''})
        };
    };
    return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Register a new Appointment</h1>
                        <form onSubmit={handleSubmit} id="create-service-appointment-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleChange}
                                    placeholder="VIN" required type="text" name='VIN' 
                                    id="VIN" className="form-control" value={serviceAppointment.VIN} />
                                <label htmlFor="VIN">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleChange} 
                                    placeholder="Owner Name" required type="text" name='owner' 
                                    id="owner" className="form-control" value={serviceAppointment.owner} />
                                <label htmlFor="owner">Owner Name</label>
                            </div>
                            <label htmlFor="owner">Date and Time</label>
                            <div className="form-floating mb-3" > 
                                <DatePicker  onChange={handleChangeDate} 
                                    placeholder="Date and Time" name='date_time' 
                                    id="date_time" className="form-control" selected={date}
                                    value={serviceAppointment.date_time}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={20}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa" />
                            </div>
                            <div className="mb-3">
                                <select required onChange={handleChange} value={serviceAppointment.technician}
                                    name='technician' id="technician" className="form-select">
                                <option value="">Choose a technician</option>
                                {technicians.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.id}>
                                                {technician.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea onChange={handleChange} 
                                    placeholder="reason" required type="text" name='reason' 
                                    id="reason" className="form-control" value={serviceAppointment.reason}>    
                                </textarea>
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
};