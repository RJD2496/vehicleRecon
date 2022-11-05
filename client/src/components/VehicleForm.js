import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NewPanelComponent from './NewPanelComponent';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';

const VehicleForm = (props) => {
    const [vehicles, setVehicles] = useState([]);
    const [stock, setStock] = useState(0);
    const [year, setYear] = useState(0);
    const [vehicleYears, setVehicleYears] = useState([]);
    const [make, setMake] = useState("");
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [model, setModel] = useState("");
    const [vehicleModels, setVehicleModels] = useState([]);
    const [odometer, setOdometer] = useState(0);
    const [color, setColor] = useState("");
    const [vehicleColors, setVehicleColors] = useState([]);
    const [cosmetics, setCosmetics] = useState({});
    const [errors, setErrors] = useState({});
    const [newPanelsPaint, setNewPanelsPaint] = useState([]);
    const [newPanelsWheels, setNewPanelsWheels] = useState([]);
    const [newPanelsAirbrush, setNewPanelsAirbrush] = useState([]);
    const [newPanelsInterior, setNewPanelsInterior] = useState([]);
    const navigate = useNavigate();

    function addNewPanel(category) {
        if (category === "paint") {
            setNewPanelsPaint([...newPanelsPaint, "Hello"]);
        }
        else if (category === "wheels") {
            setNewPanelsWheels([...newPanelsWheels, "Hello"]);
        }
        else if (category === "airbrush") {
            setNewPanelsAirbrush([...newPanelsAirbrush, "Hello"]);
        }
        else if (category === "interior") {
            setNewPanelsInterior([...newPanelsInterior, "Hello"]);
        }
    }
    
    useEffect(() => {
        const optionsYears= {
            method: 'GET',
            url: 'https://car-api2.p.rapidapi.com/api/years',
            headers: {
                'X-RapidAPI-Key': 'e323db6034mshd44e3b007b6e367p1ce5abjsn2538c3454ca5',
                'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
            }
        }
        axios.request(optionsYears)
        .then(function (response) {
            setVehicleYears(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    }, []);
    
    useEffect(() => {
        const optionsMakes= {
            method: 'GET',
            url: 'https://car-api2.p.rapidapi.com/api/makes',
            params: {direction: 'asc', sort: 'id'},
            headers: {
                'X-RapidAPI-Key': 'e323db6034mshd44e3b007b6e367p1ce5abjsn2538c3454ca5',
                'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
            }
        }
        axios.request(optionsMakes)
        .then(function (response) {
            setVehicleMakes(response.data.data);
            console.log(response.data.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        const optionsModels= {
            method: 'GET',
            url: 'https://car-api2.p.rapidapi.com/api/models',
            params: {sort: 'id', direction: 'asc'},
            headers: {
                'X-RapidAPI-Key': 'e323db6034mshd44e3b007b6e367p1ce5abjsn2538c3454ca5',
                'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
            }
        }
        axios.request(optionsModels)
        .then(function (response) {
            setVehicleModels(response.data.data);
            console.log(response.data.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        const optionsColors= {
            method: 'GET',
            url: 'https://car-api2.p.rapidapi.com/api/exterior-colors',
            params: {direction: 'asc', sort: 'id'},
            headers: {
                'X-RapidAPI-Key': 'e323db6034mshd44e3b007b6e367p1ce5abjsn2538c3454ca5',
                'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
            }
        }
        axios.request(optionsColors)
        .then(function (response) {
            setVehicleColors(response.data.data);
            console.log(response.data.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/vehicles")
            .then(res => setVehicles(res.data))
            .catch(err => console.log(err))
    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(vehicles.length);
        axios.post("http://localhost:8000/vehicle/create", {
            stock,
            year,   
            make,
            model,
            odometer,
            color
        })
            .then(res => {
                console.log(res); 
                console.log(res.data);
                navigate("/");
            })
            .catch(err => {
                console.log(err)
                setErrors(err.response.data.errors);
            })
    }


    return (
        <div className="col-8 mx-auto">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Vehicle GateWay</h1>
                <Link to={"/"}>Home</Link>
            </div>
            <h3>Add New Vehicle</h3>
            <Form onSubmit={onSubmitHandler}>
                <Container className="col-8 mx-auto" id="vehicleInputContainer">
                    <Container>
                        <h4>Vehicle Description</h4>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Control type="hidden" value={stock} onChange = {(e)=>setStock(vehicles.length)}/>
                            <Form.Label column sm="2">Year:</Form.Label>
                            <Col sm="4">
                                <Form.Select value={year} onChange = {(e) => setYear(e.target.value)}>
                                    <option value="" disabled selected>Choose Year</option>
                                    {
                                        vehicleYears.map((vehicleYear, index) => {
                                            return (
                                                <option key={index}>{vehicleYear}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Col>
                            <Form.Label column sm="2">Odometer:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="number" value={odometer} onChange = {(e)=>setOdometer(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Make:</Form.Label>
                            <Col sm="4">
                                <Form.Select value={make} onChange = {(e) => setMake(e.target.value)}>
                                    <option value="" disabled selected>Choose Make</option>
                                    {
                                        vehicleMakes.map((vehicleMake, index) => {
                                            return (
                                                <option key={index}>{vehicleMake.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Col>
                            <Form.Label column sm="2">Color:</Form.Label>
                            <Col sm="4">
                                <Form.Select value={color} onChange = {(e) => setColor(e.target.value)}>
                                    <option value="" disabled selected>Choose Color</option>
                                    {
                                        vehicleColors.map((vehicleColor, index) => {
                                            return (
                                                <option key={index}>{vehicleColor.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Model:</Form.Label>
                            <Col sm="4">
                                <Form.Select value={model} onChange = {(e) => setModel(e.target.value)}>
                                    <option value="" disabled selected>Choose Model</option>
                                    {
                                        vehicleModels.map((vehicleModel, index) => {
                                            return (
                                                <option key={index}>{vehicleModel.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Container>
                    
                    <Container>
                        {/*
                        <h4>Vehicle Cosmetics</h4>
                        <Row className="d-flex align-items-center mb-2">
                                <Col><h5>Paint</h5></Col>
                                <Col className="d-flex justify-content-end"><Button variant="primary" className="btn-circle btn-xl" onClick={() => addNewPanel("paint")}>+</Button></Col>
                                <Col><h5>Wheels</h5></Col>
                                <Col className="d-flex justify-content-end"><Button variant="primary" className="btn-circle btn-xl" onClick={() => addNewPanel("wheels")}>+</Button></Col>
                        </Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Panel:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.paint} onChange = {(e)=>setCosmetics({...cosmetics.paint, [e.target.name] : e.target.value,})}/>
                            </Col>
                            <Form.Label column sm="2">Panel:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.wheels} onChange = {(e)=>setCosmetics({...cosmetics.paint, [e.target.name] : e.target.value,})}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Fee:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.paint} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                            <Form.Label column sm="2">Fee:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.wheels} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Description:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.paint} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                            <Form.Label column sm="2">Description:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.wheels} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>{ newPanelsPaint.map((panel, index) => ( <NewPanelComponent cosmetics={cosmetics} setCosmetics={setCosmetics} /> ))}</Col>
                            <Col>{ newPanelsWheels.map((panel, index) => ( <NewPanelComponent cosmetics={cosmetics} setCosmetics={setCosmetics} /> ))}</Col>
                        </Row>
                        <Row className="d-flex align-items-center mb-2">
                                <Col><h5>Airbrush</h5></Col>
                                <Col className="d-flex justify-content-end"><Button variant="primary" className="btn-circle btn-xl" onClick={() => addNewPanel("airbrush")}>+</Button></Col>
                                <Col><h5>Interior</h5></Col>
                                <Col className="d-flex justify-content-end"><Button variant="primary" className="btn-circle btn-xl" onClick={() => addNewPanel("interior")}>+</Button></Col>
                        </Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Panel:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.paint} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                            <Form.Label column sm="2">Panel:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.wheels} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Fee:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.paint} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                            <Form.Label column sm="2">Fee:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.wheels} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Description:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.paint} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                            <Form.Label column sm="2">Description:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={cosmetics.wheels} onChange = {(e)=>setCosmetics({...cosmetics, [e.target.name] : e.target.value,})}/>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>{ newPanelsAirbrush.map((panel, index) => ( <NewPanelComponent cosmetics={cosmetics} setCosmetics={setCosmetics} /> ))}</Col>
                            <Col>{ newPanelsInterior.map((panel, index) => ( <NewPanelComponent cosmetics={cosmetics} setCosmetics={setCosmetics} /> ))}</Col>
                        </Row>
                                */}
                        <Button variant="primary" type="submit" className="mb-3">Submit</Button>
                    </Container>
                </Container>
            </Form>
        </div>
    );
}

export default VehicleForm;