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

    // retrieves vehicle data
    useEffect(() => {
        axios.get("http://localhost:8000/vehicle/" + id)
            .then( res => {
                console.log(res.data);
                setVehicle(res.data);
            })
            .catch( err => console.log(err) )
    }, [])

    // deletes vehicle if delete button is clicked
    const deleteVehicle = (vehicleId) => {
        axios.delete("http://localhost:8000/vehicle/delete/" + vehicleId)
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }


    return (
        <Container className="col-8 mx-auto">
            <Container className="d-flex justify-content-between align-items-center">
                <h1>Vehicle Recon</h1>
                <Link to= {"/"}>Home</Link>
            </Container>
            <Container className="d-flex justify-content-start">
                <h3>{vehicle.year} {vehicle.make} {vehicle.model} | Stock: {vehicle._id} | Color: {vehicle.color} | Odometer: {vehicle.odometer}</h3>
            </Container> 
            <Container className="mb-3">
                <Nav variant="tabs" defaultActiveKey="info">
                    <Nav.Item>
                        <Nav.Link eventKey="info" href={`/vehicle/${vehicle._id}`}>Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`/vehicle/${vehicle._id}/cosmetic`}>Cosmetic</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <Container className="d-flex">
                <h4 className="me-2">Vehicle Details</h4>
                <Link to={`/vehicle/${vehicle._id}/edit`} className="me-2"><button className="btn btn-primary">Edit</button></Link>
                <button className="btn btn-danger" onClick= { (e)=> {deleteVehicle(vehicle._id)} }>Delete Vehicle</button>
            </Container>
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
        </Container>
    );
}

export default VehicleInfo;