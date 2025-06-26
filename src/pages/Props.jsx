import React, { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const CardForm = ({
    children,
    cardTitle = '',
    buttonText = 'Save',  // Button label
    onButtonClick,        // Click handler for the button
    buttonClassName = 'primary_form_btn btn_h_35', // Optional button class
    onSubmit = (e) => e.preventDefault()
}) => {
    return (
        <Card className='secondary_card'>
            <Card.Body>
                {cardTitle && <Card.Title>{cardTitle}</Card.Title>}
                <Form onSubmit={onSubmit}>
                    <Row className='gx-3 row'>
                        {children}
                    </Row>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button className={buttonClassName} onClick={onButtonClick}>{buttonText}</Button>
            </Card.Footer>
        </Card>
    );
};

export default CardForm