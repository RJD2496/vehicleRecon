import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

const VehicleForm = (props) => {
    const [year, setYear] = useState(0);
    const [vehicleYears, setVehicleYears] = useState([]);
    const [make, setMake] = useState("");
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [model, setModel] = useState("");
    const [vehicleModels, setVehicleModels] = useState([]);
    const [odometer, setOdometer] = useState(0);
    const [color, setColor] = useState("");
    const [cosmetics, setCosmetics] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
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

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/vehicle/create", {
            year,   
            make,
            model,
            odometer,
            color,
            cosmetics
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
                <Container className="col-8" id="vehicleInputContainer">
                    <h4>Vehicle Description</h4>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Year:</Form.Label>
                        <Col sm="4">
                            <Form.Select>
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
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Make:</Form.Label>
                        <Col sm="4">
                            <Form.Select>
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
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Model:</Form.Label>
                        <Col sm="4">
                            <Form.Select>
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
            </Form>
        </div>
    );
}

export default VehicleForm;