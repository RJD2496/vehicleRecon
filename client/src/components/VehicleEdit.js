import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const VehicleEdit = (props) => {
    const [vehicle, setVehicle] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/vehicle/" + id)
            .then( res => {
                console.log(res.data);
                setVehicle(res.data);
            })
            .catch( err => console.log(err) )
    }, [])


    return (
        <div className="col-8 mx-auto">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Vehicle GateWay</h1>
                <Link to= {"/"}>Home</Link>
            </div>
            <div className="d-flex justify-content-start">
                <h3>{vehicle.year} {vehicle.make} {vehicle.model} | Stock: {vehicle.stock} | Color: {vehicle.color} | Odometer: {vehicle.odometer}</h3>
            </div> 
            <div className="d-flex justify-content-start">
                <DropdownButton id="dropdown-basic-button" title="Info">
                    <Dropdown.Item tag={Link} to={`/vehicle/cosmetic/${vehicle._id}`}>Cosmetic</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="d-flex justify-content-between align-items-center col-4">
                <h4>Vehicle Details</h4>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete Vehicle</button>
            </div>
        </div> 
    );
}

export default VehicleEdit;