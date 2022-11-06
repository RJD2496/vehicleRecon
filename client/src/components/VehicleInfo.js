import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

const VehicleInfo = (props) => {
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

    const deleteVehicle = (vehicleId) => {
        axios.delete("http://localhost:8000/vehicle/delete/" + vehicleId)
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="col-8 mx-auto">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Vehicle GateWay</h1>
                <Link to= {"/"}>Home</Link>
            </div>
            <div className="d-flex justify-content-start">
                <h3>{vehicle.year} {vehicle.make} {vehicle.model} | Stock: {vehicle._id} | Color: {vehicle.color} | Odometer: {vehicle.odometer}</h3>
            </div> 
            <div className="mb-3">
                <Nav variant="tabs" defaultActiveKey="info">
                    <Nav.Item>
                        <Nav.Link eventKey="info" href={`/vehicle/${vehicle._id}`}>Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`/vehicle/${vehicle._id}/cosmetic`}>Cosmetic</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className="d-flex justify-content-between align-items-center col-4">
                <h4>Vehicle Details</h4>
                <Link to={`/vehicle/${vehicle._id}/edit`}><button className="btn btn-primary">Edit</button></Link>
                <button className="btn btn-danger" onClick= { (e)=> {deleteVehicle(vehicle._id)} }>Delete Vehicle</button>
            </div>
            <Container className="vehicleDetails">
                <Row>
                    <Col xs={2}>Year:</Col>
                    <Col xs={2}>{vehicle.year}</Col>
                    <Col xs={2}>Color:</Col>
                    <Col xs={3}>{vehicle.color}</Col>
                </Row>
                <Row>
                    <Col xs={2}>Make:</Col>
                    <Col xs={2}>{vehicle.make}</Col>
                    <Col xs={2}>Odometer:</Col>
                    <Col xs={2}>{vehicle.odometer}</Col>
                </Row>
                <Row>
                    <Col xs={2}>Model:</Col>
                    <Col xs={2}>{vehicle.model}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default VehicleInfo;