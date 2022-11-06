import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Nav from 'react-bootstrap/Nav';


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

    useEffect(() => {
        console.log(paint);
                console.log(wheels);
                console.log(airbrush);
                console.log(interior)
        console.log(paint?.length);
        console.log(airbrush?.length); // wheels?.[0]?.panel === undefined
        console.log(wheels?.length);
        console.log(paint?.length); // hello
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
            console.log("showing interior");
            setShowInterior(true);
        }
    })

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
        <div className="col-8 mx-auto">

            <div className="d-flex justify-content-between align-items-center">
                <h1>Vehicle GateWay</h1>
                <Link to= {"/"}>Home</Link>
            </div>
            <div className="d-flex justify-content-start">
                <h3>{vehicle.year} {vehicle.make} {vehicle.model} | Stock: {vehicle._id} | Color: {vehicle.color} | Odometer: {vehicle.odometer}</h3>
            </div> 
            <div className="mb-3">
                <Nav variant="tabs" defaultActiveKey="cosmetic">
                    <Nav.Item>
                        <Nav.Link href={`/vehicle/${vehicle._id}`}>Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="cosmetic" href={`/vehicle/${vehicle._id}/cosmetic`}>Cosmetic</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <h4>Vehicle Cosmetics</h4>

            { showPaint && 
                <div>
                    <h5>Paint</h5>
                    <div className="ms-5">
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
                    </div>
                </div>
            }
            { showAirbrush && 
                <div>
                    <h5>Airbrush</h5>
                    <div className="ms-5">
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
                    </div>
                </div>
            }
            { showWheels && 
                <div>
                    <h5>Wheels</h5>
                    <div className="ms-5">
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
                    </div>
                </div>
            }
            { showInterior && 
                <div>
                    <h5>Interior</h5>
                    <div className="ms-5">
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
                    </div>
                </div>
            }
        </div>
    );
}

export default VehicleCosmetics;