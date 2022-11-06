import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const VehicleForm = (props) => {
    const [year, setYear] = useState();
    const [vehicleYears, setVehicleYears] = useState([]);
    const [make, setMake] = useState("");
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [model, setModel] = useState("");
    const [vehicleModels, setVehicleModels] = useState([]);
    const [odometer, setOdometer] = useState(0);
    const [color, setColor] = useState("");
    const [vehicleColors, setVehicleColors] = useState([]);
    const [paint, setPaint] = useState({});
    const [wheels, setWheels] = useState({});
    const [airbrush, setAirbrush] = useState({});
    const [interior, setInterior] = useState({});
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorsDesc, setErrorsDesc] = useState(false);
    const [newPanelsPaint, setNewPanelsPaint] = useState([]);
    const [newPanelsWheels, setNewPanelsWheels] = useState([]);
    const [newPanelsAirbrush, setNewPanelsAirbrush] = useState([]);
    const [newPanelsInterior, setNewPanelsInterior] = useState([]);
    const navigate = useNavigate();


    function addNewPanel(category) {
        if (category === "paint") {
            if (Object.keys(paint).length === 0) {
                console.log("ERROR!")
                setShowError(true);
                setTimeout(() => setShowError(false), 4000);
                return;
            }
            setShow(true);
            setTimeout(() => setShow(false), 4000);
            console.log(paint);
            setNewPanelsPaint([...newPanelsPaint, paint]);
            console.log("testpanelspaint below this line");
            console.log(newPanelsPaint);
            setPaint({}); 
        }
        else if (category === "wheels") {
            if (Object.keys(wheels).length === 0) {
                console.log("ERROR!")
                setShowError(true);
                setTimeout(() => setShowError(false), 4000);
                return;
            }
            setShow(true);
            setTimeout(() => setShow(false), 4000);
            setNewPanelsWheels([...newPanelsWheels, wheels]);
            console.log(newPanelsWheels);
            setWheels({});
        }
        else if (category === "airbrush") {
            if (Object.keys(airbrush).length === 0) {
                console.log("ERROR!")
                setShowError(true);
                setTimeout(() => setShowError(false), 4000);
                return;
            }
            setShow(true);
            setTimeout(() => setShow(false), 4000);
            setNewPanelsAirbrush([...newPanelsAirbrush, airbrush]);
            console.log(newPanelsAirbrush);
            setAirbrush({});
        }
        else if (category === "interior") {
            if (Object.keys(interior).length === 0) {
                console.log("ERROR!")
                setShowError(true);
                setTimeout(() => setShowError(false), 4000);
                return;
            }
            setShow(true);
            setTimeout(() => setShow(false), 4000);
            setNewPanelsInterior([...newPanelsInterior, interior]);
            console.log(newPanelsInterior);
            setInterior({});
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
        })
        .catch(function (error) {
            console.error(error);
        });
    }, []);

    function notArray(category) {
        if (category === "paint") {
            if (newPanelsPaint.length > 0) {
                console.log("in new panels pauint")
                return newPanelsPaint;
            } else return paint
        }
        else if (category === "airbrush") {
            if (newPanelsAirbrush.length > 0) {
                return newPanelsAirbrush;
            } else return airbrush
        }
        else if (category === "wheels") {
            if (newPanelsWheels.length > 0) {
                return newPanelsWheels;
            } else return wheels
        }
        else if (category === "interior") {
            if (newPanelsInterior.length > 0) {
                return newPanelsInterior;
            } else return interior
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/vehicle/create", {
            year,   
            make,
            model,
            odometer,
            color,
            paint:notArray("paint"),
            airbrush:notArray("airbrush"),
            wheels:notArray("wheels"),
            interior:notArray("interior")
        })
            .then(res => {
                console.log(res); 
                console.log(res.data);
                navigate("/");
            })
            .catch(err => {
                console.log(err)
                setErrorsDesc(true);
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
                        {   errorsDesc &&
                                <Alert variant="danger" onClose={() => setErrorsDesc(false)} dismissible>
                                    <Alert.Heading>Error!</Alert.Heading>
                                    { errors.year ? <p className="errors">{errors.year.message}</p> : null }
                                    { errors.odometer ? <p className="errors">{errors.odometer.message}</p> : null }
                                    { errors.make ? <p className="errors">{errors.make.message}</p> : null }
                                    { errors.color ? <p className="errors">{errors.color.message}</p> : null }
                                    { errors.model ? <p className="errors">{errors.model.message}</p> : null }
                                </Alert>
                        }
                        <Form.Group as={Row} className="mb-3">
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
                        <h4>Vehicle Cosmetics</h4>
                        {   show &&
                                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                                    <Alert.Heading>Saved!</Alert.Heading>
                                    <p>Add a new panel if needed!</p>
                                </Alert>
                        }
                        {   showError &&
                                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                                    <Alert.Heading>Error!</Alert.Heading>
                                    <p>Please enter fields before adding another panel</p>
                                </Alert>
                        }
                        <Row className="d-flex align-items-center mb-2">
                                <Col><h5>Paint</h5></Col>
                                <Col className="d-flex justify-content-end"><Button variant="primary" className="btn-circle btn-xl" onClick={() => addNewPanel("paint")}>+</Button></Col>
                                <Col><h5>Wheels</h5></Col>
                                <Col className="d-flex justify-content-end"><Button variant="primary" className="btn-circle btn-xl" onClick={() => addNewPanel("wheels")}>+</Button></Col>
                        </Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Panel:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={paint.panel || ""} name="panel" onChange = {(e)=>setPaint({...paint, [e.target.name] : e.target.value})}/>
                            </Col>
                            <Form.Label column sm="2">Panel:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={wheels.panel || ""} name="panel" onChange = {(e)=>setWheels({...wheels, [e.target.name] : e.target.value})}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Fee:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="Number" value={paint.fee || ""} name="fee" onChange = {(e)=>setPaint({...paint, [e.target.name] : e.target.value})}/>
                            </Col>
                            <Form.Label column sm="2">Fee:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="Number" value={wheels.fee || ""} name="fee" onChange = {(e)=>setWheels({...wheels, [e.target.name] : e.target.value})}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Description:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={paint.desc || ""} name="desc" onChange = {(e)=>setPaint({...paint, [e.target.name] : e.target.value})}/>
                            </Col>
                            <Form.Label column sm="2">Description:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={wheels.desc || ""} name="desc" onChange = {(e)=>setWheels({...wheels, [e.target.name] : e.target.value})}/>
                            </Col>
                        </Form.Group>
                        <Row className="d-flex align-items-center mb-2">
                                <Col><h5>Airbrush</h5></Col>
                                <Col className="d-flex justify-content-end"><Button variant="primary" className="btn-circle btn-xl" onClick={() => addNewPanel("airbrush")}>+</Button></Col>
                                <Col><h5>Interior</h5></Col>
                                <Col className="d-flex justify-content-end"><Button variant="primary" className="btn-circle btn-xl" onClick={() => addNewPanel("interior")}>+</Button></Col>
                        </Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Panel:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={airbrush.panel || ""} name="panel" onChange = {(e)=>setAirbrush({...airbrush, [e.target.name] : e.target.value})}/>
                            </Col>
                            <Form.Label column sm="2">Panel:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={interior.panel || ""} name="panel" onChange = {(e)=>setInterior({...interior, [e.target.name] : e.target.value})}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Fee:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="Number" value={airbrush.fee || ""} name="fee" onChange = {(e)=>setAirbrush({...airbrush, [e.target.name] : e.target.value})}/>
                            </Col>
                            <Form.Label column sm="2">Fee:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="Number" value={interior.fee || ""} name="fee" onChange = {(e)=>setInterior({...interior, [e.target.name] : e.target.value})}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Description:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={airbrush.desc || ""} name="desc" onChange = {(e)=>setAirbrush({...airbrush, [e.target.name] : e.target.value})}/>
                            </Col>
                            <Form.Label column sm="2">Description:</Form.Label>
                            <Col sm="4">
                                <Form.Control type="String" value={interior.desc || ""} name="desc" onChange = {(e)=>setInterior({...interior, [e.target.name] : e.target.value})}/>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mb-3">Submit</Button>
                    </Container>
                </Container>
            </Form>
        </div>
    );
}

export default VehicleForm;