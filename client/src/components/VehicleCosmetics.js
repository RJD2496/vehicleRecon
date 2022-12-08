import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';


const VehicleCosmetics = (props) => {
    const [vehicle, setVehicle] = useState({});
    const {id} = useParams();
    const [paint, setPaint] = useState([]);
    const [showPaint, setShowPaint] = useState(false);
    const [showAirbrush, setShowAirbrush] = useState(false);
    const [showWheels, setShowWheels] = useState(false);
    const [showInterior, setShowInterior] = useState(false);
    const [airbrush, setAirbrush] = useState([]);
    const [wheels, setWheels] = useState([]);
    const [interior, setInterior] = useState([]);

    // retrieves vehicle data
    useEffect(() => {
        axios.get("http://localhost:8000/vehicle/" + id)
            .then( res => {
                setVehicle(res.data);
                setPaint(res.data.paint);
                setAirbrush(res.data.airbrush);
                setWheels(res.data.wheels);
                setInterior(res.data.interior);
            })
            .catch( err => console.log(err) )
    }, [])

    // sets vehicle cosmetics to true if any exists
    useEffect(() => {
        if (paint?.length > 0 && paint?.[0]?.panel !== undefined) {
            setShowPaint(true);
        }
        if (airbrush?.length > 0 && airbrush?.[0]?.panel !== undefined) {
            setShowAirbrush(true);
        }
        if (wheels?.length > 0 && wheels?.[0]?.panel !== undefined) {
            setShowWheels(true);
        }
        if (interior?.length > 0 && interior?.[0]?.panel !== undefined) {
            setShowInterior(true);
        }
    })

    // completes vehicle operation once confirmed by user
    const completeOperation = (vehicleId, category) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to complete this operation?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.put("http://localhost:8000/vehicle/completecosmetic/" + vehicleId + "/" + category)
                        .then(res => {
                            console.log(res.data);
                            window.location.reload();
                        })
                        .catch(err => console.log(err))
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log("Cancelled")
                }
            ]
        });
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
                <Nav variant="tabs" defaultActiveKey="cosmetic">
                    <Nav.Item>
                        <Nav.Link href={`/vehicle/${vehicle._id}`}>Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="cosmetic" href={`/vehicle/${vehicle._id}/cosmetic`}>Cosmetic</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <h4>Vehicle Cosmetics</h4>

            { showPaint && 
                <Container>
                    <h5>Paint</h5>
                    <Container className="ms-5">
                        <button className="btn btn-primary mb-2" onClick= { (e)=> {completeOperation(vehicle._id, "paint")} }>Complete</button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Operation</th>
                                    <th>Fee</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                vehicle.paint.map((operation, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{operation.panel}</td>
                                            <td>{operation.fee}</td>
                                            <td>{operation.desc}</td>
                                        </tr>
                                    );
                                })
                            }   
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            }
            { showAirbrush && 
                <Container>
                    <h5>Airbrush</h5>
                    <Container className="ms-5">
                        <button className="btn btn-primary mb-2" onClick= { (e)=> {completeOperation(vehicle._id, "airbrush")} }>Complete</button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Operation</th>
                                    <th>Fee</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                vehicle.airbrush.map((operation, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{operation.panel}</td>
                                            <td>{operation.fee}</td>
                                            <td>{operation.desc}</td>
                                        </tr>
                                    );
                                })
                            }   
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            }
            { showWheels && 
                <Container>
                    <h5>Wheels</h5>
                    <Container className="ms-5">
                        <button className="btn btn-primary mb-2" onClick= { (e)=> {completeOperation(vehicle._id, "wheels")} }>Complete</button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Operation</th>
                                    <th>Fee</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                vehicle.wheels.map((operation, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{operation.panel}</td>
                                            <td>{operation.fee}</td>
                                            <td>{operation.desc}</td>
                                        </tr>
                                    );
                                })
                            }   
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            }
            { showInterior && 
                <Container>
                    <h5>Interior</h5>
                    <Container className="ms-5">
                        <button className="btn btn-primary mb-2" onClick= { (e)=> {completeOperation(vehicle._id, "interior")} }>Complete</button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Operation</th>
                                    <th>Fee</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                vehicle.interior.map((operation, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{operation.panel}</td>
                                            <td>{operation.fee}</td>
                                            <td>{operation.desc}</td>
                                        </tr>
                                    );
                                })
                            }   
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            }
        </Container>
    );
}

export default VehicleCosmetics;