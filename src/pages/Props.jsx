import React, { useState } from 'react';
import Images from '../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Image, Pagination, Modal, CardHeader } from 'react-bootstrap';

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
    onSubmit,
    cardTitle = 'Organization Profile',
    buttonTextSave = 'Submit',
    buttonTextCancel = 'Cancel',
    onButtonClick,
    buttonClassName = 'primary_form_btn btn_h_35',
    //onSubmit = (e) => e.preventDefault()
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
                <Button className={buttonClassName} onClick={onSubmit}>{buttonTextSave}</Button>
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
    showFooter = true,

    // Actions
    onButtonClick,
    onFilterClick,
    onDeleteClick,

    buttonClassName = 'primary_form_btn btn_h_35',
    buttonClassIcon = 'primary_form_btn btn_h_35',
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
                                <Button className={buttonClassIcon} onClick={onFilterClick}>
                                    <img src={Images.GirdFilter} alt="" />
                                </Button>
                            </li>
                        )}
                        {showDeleteButton && (
                            <li>
                                <Button className={buttonClassIcon} onClick={onDeleteClick}>
                                    <img src={Images.GirdDelete} alt="" />
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
            {showFooter && (
                <div className='table_footer'>
                    <div className="paginations">
                        <div>
                            <Form.Select>
                                <option>30 Results</option>
                                <option>10 Results</option>
                            </Form.Select>
                        </div>
                        <Pagination size="sm" className="mb-0">
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item active>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item>{18}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                        <div className="jumpTo">
                            Jump to:
                            <Form.Control type="number" size="sm" className=""/>
                        </div>
                    </div>
                </div>
            )}
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
    handleChange,
    name,
    className = 'mb-3',
    errors,
    required = false
}) => {
    return (
        <Form.Group autoComplete="off" className={`position-relative ${className}`} controlId={controlId}>
            {label && (
                <Form.Label>
                    {label}
                    {required && <span className="text-danger"> *</span>}
                </Form.Label>
            )}
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                name={name}
                required={required}
                isInvalid={!!errors}
                autoComplete="off"
            />
            {errors && (
                <Form.Control.Feedback type="invalid" className="error_msg">
                    {errors}
                </Form.Control.Feedback>
            )}
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
            <Modal.Body className=''>
                <Row className='gx-3'>
                    {typeof bodyContent === "string" ? <p>{bodyContent}</p> : bodyContent}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button className={footerButtonSubmitClass} onClick={onSubmit}>{footerButtonSubmit}</Button>
                <Button className={footerButtonCancelClass} onClick={onHide}>{footerButtonCancel}</Button>
            </Modal.Footer>
        </Modal>
    );
}

// Component InlineInputField.....

export const InlineInputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  controlId,
  labelCol = 2,
  inputCol = 6
}) => {
  return (
    <Form.Group as={Row} className="mb-3 inlineForm" controlId={controlId || name}>
      <Form.Label column sm={labelCol}>
        {label}
      </Form.Label>
      <Col sm={inputCol}>
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          isInvalid={!!error}
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

// Component InlineSelectField.....

export const InlineSelectField = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  options = [],
  placeholder = 'Select an option',
  controlId,
  labelCol = 2,
  inputCol = 6
}) => {
  return (
    <Form.Group as={Row} className="mb-3 inlineForm" controlId={controlId || name}>
      <Form.Label column sm={labelCol}>
        {label}
      </Form.Label>
      <Col sm={inputCol}>
        <Form.Select
          name={name}
          value={value}
          onChange={onChange}
          isInvalid={!!error}
          required={required}
          aria-label={`${label} select`}
        >
          <option value="">{placeholder}</option>
          {options.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

// Component CheckboxField.....

export const RadioGroupField = ({
  label = '',
  name,
  options = [],
  value,
  onChange,
  error,
  controlId,
}) => {
  return (
    <Form.Group as={Row} className="mb-3 inlineForm" controlId={controlId}>
      <Form.Label column sm="2">
        {label}
      </Form.Label>
      <Col sm="6">
        {options.map((option, idx) => (
          <div key={`${name}-${option.value}-${idx}`} className="m-0">
            <Form.Check
              type="radio"
              name={name}
              id={`${name}-${option.value}`}
              label={option.label}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              isInvalid={!!error}
            />
          </div>
        ))}
        {error && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {error}
          </Form.Control.Feedback>
        )}
      </Col>
    </Form.Group>
  );
};

