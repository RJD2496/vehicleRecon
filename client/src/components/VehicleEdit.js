import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';

const VehicleEdit = (props) => {
    const {id} = useParams();
    const [stock, setStock] = useState();
    const [year, setYear] = useState();
    const [make, setMake] = useState();
    const [model, setModel] = useState();
    const [color, setColor] = useState();
    const [odometer, setOdometer] = useState();
    const [vehicleColors, setVehicleColors] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/vehicle/" + id)
            .then( res => {
                console.log(res.data);
                setYear(res.data.year);
                setMake(res.data.make);
                setModel(res.data.model);
                setColor(res.data.color);
                setOdometer(res.data.odometer);
                setStock(res.data._id);
                
            })
            .catch( err => console.log(err) )
    }, [])

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

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/vehicle/edit/' + id, {
            color,
            odometer,    
        })
            .then(res => {
                console.log(res);
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
                <h3>{year} {make} {model} | Stock: {stock} | Color: {color} | Odometer: {odometer}</h3>
            </div> 
            <h4>Vehicle Details</h4>
            <Form onSubmit={onSubmitHandler}>
                <Container className="vehicleDetails">
                    <Row className="mb-2">
                        <Col sm={2}>Year:</Col>
                        <Col sm={2}>{year}</Col>
                        <Col sm={2}>Color:</Col>
                        <Col sm={3}>
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
                    </Row>
                    <Row className="mb-2">
                        <Col sm={2}>Make:</Col>
                        <Col sm={2}>{make}</Col>
                        <Col sm={2}>Odometer:</Col>
                        <Col sm={2}><Form.Control type="number" value={odometer} onChange = {(e)=>setOdometer(e.target.value)}/></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm={2}>Model:</Col>
                        <Col sm={2}>{model}</Col>
                    </Row>
                    <Button variant="primary" type="submit" className="mb-3">Submit</Button>
                </Container>
            </Form>
                

                
                
            
        </div> 
    );
}

export default VehicleEdit;