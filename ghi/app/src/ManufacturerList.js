import { useEffect, useState } from 'react'



export default function ManufacturerList() {

    const [manufacturers, setManufacturers] = useState([])
    const fetchManufacturers = async () => {
        const url = 'http://localhost:8100/api/manufacturers'
        const res = await fetch(url)
        const manufacturersDict = await res.json()
        console.log(manufacturersDict)
        setManufacturers(manufacturersDict.manufacturers)
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturer Name</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{ manufacturer.name }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

