import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const VehicleList = (props) => {
    const[ vehicles, setVehicles] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    // retrieves all vehicles 
    useEffect(() => {
        axios.get("http://localhost:8000/vehicles")
            .then(res => setVehicles(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container className="col-8 mx-auto">
            <Container className="d-flex justify-content-between align-items-center">
                <h1>Vehicle Recon</h1>
                <Container className="col-8">
                    <input type="text" value={searchInput} className="form-control form-control-md" placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)}
                    />
                </Container>
            </Container>
            <Container className="d-flex justify-content-end">
                <Link to="/vehicle/new"><button className="btn btn-primary">Add Vehicle</button></Link>
            </Container>
            <Container className="mt-2">
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
                        {vehicles.filter(vehicle => {
                            if (searchInput === "") {
                                return vehicle;
                            } else if (vehicle._id.includes(searchInput)) {
                                return vehicle;
                            }
                        }).map((vehicle, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link to={`/vehicle/${vehicle._id}`}>{vehicle._id}</Link></td>
                                        <td>{vehicle.year}</td>
                                        <td>{vehicle.make}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle.odometer}</td>
                                        <td>{vehicle.color}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}

export default VehicleList;