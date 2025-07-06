import React, { useState } from 'react';
import Images from '../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Image, Modal, CardHeader } from 'react-bootstrap';

// Bootstrap imports

// Component Card.....

export const CardForm = ({
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
                    <Row className='gx-3'>
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

// Component Card Tertiary.....

export const CardFromTertiary = ({
    children,
    cardTitle = 'Organization Profile',
    buttonTextSave = 'Submit',
    buttonTextCancel = 'Cancel',
    onButtonClick,
    buttonClassName = 'primary_form_btn btn_h_35',
    onSubmit = (e) => e.preventDefault()
}) => {
    return (
        <Card className='Tertiary_card'>
            <CardHeader>
                {cardTitle && <Card.Title>{cardTitle}</Card.Title>}
            </CardHeader>
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    {children}
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button className={buttonClassName} onClick={onButtonClick}>{buttonTextSave}</Button>
            </Card.Footer>
        </Card>
    );
}

// Component Grid.....

export const PrimaryGird = ({
    children,
    cardTitle = 'Visa',
    buttonText = 'Add Visa',
    buttonFilter = 'Filter',
    buttonDelete = 'Delete',
    // Visibility Toggles
    showSearch = true,
    showAddButton = true,
    showFilterButton = true,
    showDeleteButton = true,

    // Actions
    onButtonClick,
    onFilterClick,
    onDeleteClick,

    buttonClassName = 'primary_form_btn btn_h_35',
    showSearch = true,
    tableHeaders = [],
}) => {
    return (
        <div className="primary_table mb-3">
            <div className="table_header">
                <h5>{cardTitle}</h5>
                <div className="heading_elements">
                    <ul>
                        {showSearch && (
                            <li>
                                <input className="grid_search" type="text" placeholder="Search" />
                            </li>
                        )}
                        {showAddButton && (
                            <li>
                                <Button className={buttonClassName} onClick={onButtonClick}>
                                    {buttonText}
                                </Button>
                            </li>
                        )}
                        {showFilterButton && (
                            <li>
                                <Button className={buttonClassName} onClick={onFilterClick}>
                                    {buttonIcons.filter && (
                                        <img src={buttonIcons.filter} alt="Filter" className="me-2" />
                                    )}
                                    {buttonFilter}
                                </Button>
                            </li>
                        )}
                        {showDeleteButton && (
                            <li>
                                <Button className={buttonClassName} onClick={onDeleteClick}>
                                    {buttonIcons.delete && (
                                        <img src={buttonIcons.delete} alt="Delete" className="me-2" />
                                    )}
                                    {buttonDelete}
                                </Button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="table_body">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

// Component InputField.....

export const InputField = ({
    label = '',
    type = 'text',
    placeholder = '',
    controlId = '',
    value,
    onChange,
    name,
    className = 'mb-3',
    required = false
}) => {
    return (
        <Form.Group className={className} controlId={controlId}>
            <Form.Label>{label}{required && <span className="text-danger"> *</span>}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
            />
        </Form.Group>
    );
};

// Component SelectField.....

export const SelectInput = ({
    controlId,
    label,
    options,
    name,
    placeholder = "Select an option",
    className = "mb-3" }) => {

    return (
        <Form.Group className={className} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Select name={name} aria-label={`${label} select`}>
                <option>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.key} value={option.value || option.label}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
};

// Component Modal.....

export const CustomModal = ({
    show,
    onSubmit,
    onHide,
    title = "Modal Title",
    subtitle = "Modal Sub Title",
    bodyContent = "",
    size = "md",
    centered = true,
    footerButtonSubmit = "Submit",
    footerButtonCancel = "Cancel",
    footerButtonSubmitClass = "",
    footerButtonCancelClass = ""
}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered={centered}
            className='PrimaryModal'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='ModalTopIcon'>
                        <i className='ModalIcon'>
                            <Image src={Images.ModalIcon} />
                        </i>
                        {/* <i className='CloseIcon'>
                            <Image src={Images.ModalClose}/>
                        </i> */}
                    </div>
                    <div className='ModalTopHeading'>
                        <h4>{title}</h4>
                        <p>{subtitle}</p>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='pb-0 pt-0'>
                {typeof bodyContent === "string" ? <p>{bodyContent}</p> : bodyContent}
            </Modal.Body>
            <Modal.Footer>
                <Button className={footerButtonSubmitClass} onClick={onSubmit}>{footerButtonSubmit}</Button>
                <Button className={footerButtonCancelClass} onClick={onHide}>{footerButtonCancel}</Button>
            </Modal.Footer>
        </Modal>
    );
}
