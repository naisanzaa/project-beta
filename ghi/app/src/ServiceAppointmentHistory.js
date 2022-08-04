import { useEffect, useState } from 'react'



export default function ServiceAppointmentHistory() {

    const [serviceAppointments, setServiceAppointments] = useState([])
    const fetchServiceAppointments = async () => {
        const url = 'http://localhost:8080/api/service-appointments/'
        const res = await fetch(url)
        const serviceAppointmentsDict = await res.json()
        console.log(serviceAppointmentsDict)
        setServiceAppointments(serviceAppointmentsDict.service_appointments)
    }

    const [automobileVOs, setAutomobileVOs] = useState([]);
    const fetchAutomobileVOs = async () => {
        const url = 'http://localhost:8080/api/automobilevo/'
        const res = await fetch(url)
        const automobileVODict = await res.json()
        setAutomobileVOs(automobileVODict.autos)
    }

    const [filteredData,setFilteredData] = useState(serviceAppointments);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchServiceAppointments();
        fetchAutomobileVOs();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch(
          `http://localhost:8080/api/service-appointments/${id}`,
          {
            method: 'DELETE'
          },
        )
        if (res.ok) {
            setServiceAppointments(
                serviceAppointments.filter((appointment) => {
                    return appointment.id !== id
                })
            )
        };
    };

    const appointmentFilter= (appointment) => {
        return appointment.finished === true;
    }

    // Update state of search query as characters are typed into search bar
    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filters the data based on what was typed and matches it with VIN
    //      it is possible to use partial values for VIN
    // Currently Functionality does not prevent seeing all appts with no input text
    //      Workaround is disabling button if no input text
    const handleSearch = (event) =>{
        event.preventDefault();
        let result = [];
        result = serviceAppointments.filter((data) => {
            return (data.toString().trim().length > 0) ? data.VIN.search(searchQuery) !== -1: [];
        });
        setFilteredData(result);
    }

    // if the vin matches a vin from the automobile inventory, highlight the row
    const conditionalRowStyle = (vin) => {
        if (automobileVOs.find((obj) => obj.VIN === vin ))
        {
            return {
                backgroundColor: "LemonChiffon",
            }
        }
    }
    return (
        <div>
            <form onSubmit={(event) =>handleSearch(event)} id="search-vin-form">
                <div style={{ margin: '0 auto', marginTop: '10%' }}>
                    <label>Search VIN:</label>
                    <input onChange={handleChange} type="text" placeholder="Search VIN"/>
                    <button disabled={searchQuery.length < 1} type='submit' className="btn btn-primary">Search</button>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Owner</th>
                        <th>Date of Appointment</th>
                        <th>Time of Appointment</th>
                        <th>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.filter(appointmentFilter).map(appointment => {
                        return (
                            <tr key={appointment.id} style={ conditionalRowStyle(appointment.VIN) }>
                                <td>{ appointment.VIN }</td>
                                <td>{ appointment.owner }</td>
                                <td>{ new Date(appointment.date_time).toLocaleDateString() }</td>
                                <td>{ new Date(appointment.date_time).toLocaleTimeString() }</td>
                                <td>{ appointment.technician.name }</td>
                                <td><button onClick={ () => handleDelete(appointment.id)}>Delete?</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

