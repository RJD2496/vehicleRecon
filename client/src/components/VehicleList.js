import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const VehicleList = (props) => {
    const[vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/vehicles")
            .then(res => setVehicles(res.data))
            .catch(err => console.log(err))
    }, [])

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


    return (
        <div className="col-8 mx-auto">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Vehicle Gateway</h1>
                <div className="col-8">
                    <input type="text" className="form-control form-control-md" placeholder="Search..."/>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Link to="/vehicle/new"><button className="btn btn-primary">Add Vehicle</button></Link>
            </div>
            <div className="mt-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Stock #</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Odometer</th>
                            <th>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehicles.map((vehicle, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link to={`/vehicle/${vehicle._id}`}>{vehicle._id}</Link></td>
                                        <td>{vehicle.year}</td>
                                        <td>{capitalizeFirst(vehicle.make)}</td>
                                        <td>{capitalizeFirst(vehicle.model)}</td>
                                        <td>{vehicle.odometer}</td>
                                        <td>{capitalizeFirst(vehicle.color)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default VehicleList;