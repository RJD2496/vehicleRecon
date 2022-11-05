import React from 'react'; 
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const NewPanelComponent = (props) => { 

    return ( 
        <div>
            <hr/>
            <Form.Group as={Row} className="d-flex justify-content-between mb-3">
                <Form.Label column sm="2">Panel:</Form.Label>
                <Col sm="8">
                    <Form.Control type="String" value={props.category.panel || ""} name="panel" onChange = {(e)=>props.setCategory({...props.category, [e.target.name] : e.target.value})}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="d-flex justify-content-between mb-3">
                <Form.Label column sm="2">Fee:</Form.Label>
                <Col sm="8">
                    <Form.Control type="String" value={props.category.fee} name="fee" onChange = {(e)=>props.setCategory({...props.category, [e.target.name] : e.target.value,})}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="d-flex justify-content-between mb-3">
                <Form.Label column sm="2">Description:</Form.Label>
                <Col sm="8">
                    <Form.Control type="String" value={props.category.desc} name="desc" onChange = {(e)=>props.setCategory({...props.category, [e.target.name] : e.target.value,})}/>
                </Col>
            </Form.Group>
        </div>
    
    ); 

}; 
export default NewPanelComponent;