import React, { useState, useEffect } from 'react';
import Images from '../pages/Images.jsx';
import Combobox from "react-widgets/Combobox";
import ComboDate from '../data/Combo.json';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Toast, Tabs, Offcanvas, Button, Table, Image, Pagination, Modal, CardHeader } from 'react-bootstrap';

// Bootstrap imports

// Component Card.....

export const CardForm = ({
    children,
    onSubmit,
    cardTitle = '',
    footerButtonSubmit = "Save",
    footerButtonSubmitClass = "",
    footerButtonSubmitDisabled = false,   // 🔥 new prop
    footerExtraButton = null,             // 🔥 new prop
}) => {
    return (
        <Card className='secondary_card'>
            <Card.Body>
                {cardTitle && <Card.Title>{cardTitle}</Card.Title>}
                <Form>
                    <Row className='gx-3'>
                        {children}
                    </Row>
                </Form>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
                {/* Submit button (Save / Update) */}
                <Button 
                    type="submit"
                    onClick={onSubmit}
                    className={footerButtonSubmitClass} 
                    disabled={footerButtonSubmitDisabled}  // ✅ disable support
                >
                    {footerButtonSubmit}
                </Button>

                {/* Extra button (Edit, Cancel, etc.) */}
                {footerExtraButton && footerExtraButton}
            </Card.Footer>
        </Card>
    );
};


// Component Card Tertiary.....

export const CardFromTertiary = ({
    children,
    footerButtonSubmitOnClick,
    cardTitle = 'Organization Profile',
    // headerButtonEdit = "Edit",
    // headerButtonEditClass = "",
    footerButtonSubmitClass = "",
    footerButtonSubmit = "Submit",

}) => {
    return (
        <Card className='Tertiary_card'>
            {/* <CardHeader>
                {cardTitle && <Card.Title>{cardTitle}</Card.Title>}
                <Button className={headerButtonEditClass} onClick={onSubmit}>{headerButtonEdit}</Button>
            </CardHeader> */}
            <Card.Body>
                {children}
            </Card.Body>
            <Card.Footer>
                <Button className={footerButtonSubmitClass} onClick={footerButtonSubmitOnClick}>{footerButtonSubmit}</Button>
            </Card.Footer>
        </Card>
    );
};

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
                            <Form.Control type="number" size="sm" className="" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Component Employee Grid.....

export const EmployeeGird = ({

    children,

    // Visibility Toggles
    showSearch = true,
    showPositionButton = true,
    showDepartmentButton = true,
    showStatusButton = true,
    showFooter = true,

    //Pagination
    pagination,
    handlePaginationChange,
    setPagination,

    //search and filters
    setSearchTerm,
    filters,
    setFilters,
    // Actions
    onDeleteClick,

    buttonClassName = 'primary_form_btn btn_h_35',
    buttonClassIcon = 'primary_form_btn btn_h_35',
    tableHeaders = [],
}) => {

    const designationOptions = ComboDate.Designation.map(dep => dep.label);
    const departmentOptions = ComboDate.Department.map(dep => dep.label);
    //const statusOptions = ComboDate.Status.map(dep => dep.label);

    return (
        <div className="addEmployee_table">
            <div className="table_header">
                <div className="heading_elements">
                    <ul>
                        {showSearch && (
                            <li className='searchInput'>
                                <input className="grid_search" onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search" />
                            </li>
                        )}
                        {showPositionButton && (
                            <li>
                                <Combobox
                                    defaultValue="All Positions"
                                    data={designationOptions}
                                    value={filters.position || "All Positions"}
                                    onChange={(value) => setFilters(prev => ({ ...prev, position: value }))}
                                />
                            </li>
                        )}
                        {showDepartmentButton && (
                            <li>
                                <Combobox
                                    defaultValue="All Departments"
                                    data={departmentOptions}
                                    value={filters.department || "All Departments"}
                                    onChange={(value) => setFilters(prev => ({ ...prev, department: value }))}
                                />
                            </li>
                        )}
                        {showStatusButton && (
                            <li>
                                <Combobox
                                    defaultValue="All Status"
                                    //data={statusOptions}
                                    value={filters.status || "All Status"}
                                    onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                                />
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
                            <Form.Select name="rowsPerPage" value={pagination.rowsPerPage} onChange={handlePaginationChange}>
                                <option key={30} value={30}>30 Results</option>
                                <option key={10} value={10}>10 Results</option>
                                <option key={5} value={5}>5 Results</option>
                            </Form.Select>
                        </div>
                        <Pagination size="sm" className="mb-0">
                            <Pagination.First
                                disabled={pagination?.currentPage === 1}
                                onClick={() => setPagination(prev => ({ ...prev, currentPage: 1 }))}
                            />
                            <Pagination.Prev
                                disabled={pagination?.currentPage === 1}
                                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                            />
                            {   pagination.currentPage !== 1 && (
                                <Pagination.Item onClick={()=>setPagination(prev=>({...prev,currentPage:1}))}>{1}</Pagination.Item>
                            )}

                            {parseInt(pagination?.currentPage) - 1 > 1 && <Pagination.Ellipsis />}
                            
                            <Pagination.Item active>{pagination?.currentPage || 1}</Pagination.Item>

                            {parseInt(pagination?.currentPage) + 1 < pagination.totalPages && (
                                <Pagination.Item onClick={()=>setPagination(prev=>({...prev,currentPage:parseInt(pagination?.currentPage) + 1}))}>
                                    {parseInt(pagination?.currentPage) + 1}
                                </Pagination.Item>
                            )}

                            {parseInt(pagination?.totalPages) - parseInt(pagination?.currentPage) > 1 && <Pagination.Ellipsis />}

                            {pagination.currentPage !== pagination?.totalPages && (
                                <Pagination.Item onClick={()=>setPagination(prev=>({...prev,currentPage:pagination.totalPages}))}>
                                    {pagination?.totalPages}
                                </Pagination.Item>
                            )}
                            <Pagination.Next
                                disabled={pagination?.currentPage === pagination?.totalPages}
                                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                            />
                            <Pagination.Last
                                disabled={pagination?.currentPage === pagination?.totalPages}
                                onClick={() => setPagination(prev => ({ ...prev, currentPage: pagination?.totalPages }))}
                            />
                        </Pagination>
                        <div className="jumpTo">
                            Jump to:
                            <Form.Control
                                name="currentPage"
                                value={pagination?.currentPage || 1}
                                onChange={handlePaginationChange}
                                type="text"
                                size="lg"
                                min={1}
                                max={pagination?.totalPages || 1}
                                className=""
                            />
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
    name,
    type = 'text',
    value,
    handleChange,
    error,
    placeholder = '',
    required = false,
    disabled ,
    controlId = '',
    className = 'mb-3',
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
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required={required}
                isInvalid={!!error}
                autoComplete="off"
                disabled={disabled}
            />
            {error && (
                <Form.Control.Feedback type="invalid" className="error_msg">
                    {error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
};

// Component InputField.....

export const UploadInputField = ({
    label = '',
    name,
    type = 'file',
    handleChange,
    error,
    placeholder = '',
    required = false,
    controlId = '',
    className = 'mb-3',
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
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
                isInvalid={!!error}
                autoComplete="off"
                accept="*/*"
            />
            {error && (
                <Form.Control.Feedback type="invalid" className="error_msg">
                    {error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
};

// Component SelectField.....

export const SelectInput = ({
    label,
    name,
    value,
    handleChange,
    error,
    placeholder = "",
    required = false,
    disabled ,
    controlId,
    options,
    className = 'mb-3'
}) => {
    return (
        <Form.Group className={`position-relative ${className}`} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Select
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                name={name}
                required={required}
                isInvalid={!!error}
                disabled={disabled}
                aria-label={`${label} select`}
            >
                <option>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.key} value={option.value || option.label}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
            {error && (
                <Form.Control.Feedback type="invalid" className="error_msg">
                    {error}
                </Form.Control.Feedback>
            )}
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
    centered = true,
    size = "md", // ✅ Correctly defined here
    footerButtonSubmit = "Submit",
    footerButtonCancel = "Cancel",
    footerButtonSubmitClass = "",
    footerButtonCancelClass = "",
    className = ""
}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered={centered}
            className={className}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='ModalTopIcon'>
                        <i className='ModalIcon'>
                            <Image src={Images.ModalIcon} />
                        </i>
                        {/* <i className='CloseIcon'>
                            <Image src={Images.ModalClose</div>}/>
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
};

// Component Modal.....

export const CustomModalConfirmDialog = ({
    show,
    onSubmit,
    onHide,
    title = "Modal Title",
    subtitle = "Modal Sub Title",
    bodyContent = "",
    centered = true,
    size = "md", // ✅ Correctly defined here
    footerButtonSubmit = "Submit",
    footerButtonCancel = "Cancel",
    footerButtonSubmitClass = "",
    footerButtonCancelClass = "",
    className = "",
    showSubmitButton = true,   // NEW
    showCancelButton = true    // NEW
}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered={centered}
            className={className}
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className=''>
                <Row className='gx-3'>
                    {typeof bodyContent === "string" ? <p>{bodyContent}</p> : bodyContent}
                </Row>
            </Modal.Body>
            {(showSubmitButton || showCancelButton) && (
                <Modal.Footer>
                    {showCancelButton &&(
                        <Button className={footerButtonCancelClass} onClick={onHide}>{footerButtonCancel}</Button>
                    )}
                    {showSubmitButton && (
                        <Button className={footerButtonSubmitClass} onClick={onSubmit}>{footerButtonSubmit}</Button>
                    )}
                </Modal.Footer>
            )}
            
        </Modal>
    );
};

// Component InlineInputField.....

export const InlineInputField = ({
    label,
    name,
    type = 'text',
    value,
    handleChange,
    error,
    placeholder,
    required = false,
    controlId,
    labelCol = 2,
    inputCol = 6,
    previewUrl,
    setPreviewUrl,
}) => {


    // If parent passes an existing image value (e.g., on edit form)
    useEffect(() => {
        if (type === 'file' && value && typeof value !== 'string') {
            const objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value, type]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            handleChange({ target: { name, value: file } });
        }
    };
    return (
        <Form.Group as={Row} className="mb-3 inlineForm" controlId={controlId || name}>
            <Form.Label column sm={labelCol}>
                {label}
                {required && <span className="text-danger"> *</span>}
            </Form.Label>
            <Col sm={inputCol} className="position-relative">
                {type === 'file' ? (
                    <>
                        <label htmlFor={name} className="file-upload-box" style={{ cursor: 'pointer' }}>
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                />
                            ) : (
                                <div>
                                    Upload Your Company Logo
                                </div>
                            )}
                        </label>
                        <input
                            type="file"
                            name={name}
                            id={name}
                            onChange={handleFileChange}
                            required={required}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                        <Form.Control.Feedback type="invalid" className="error_msg ms-3 p-0">
                            {error}
                        </Form.Control.Feedback>
                    </>
                ) : (
                    <>
                        <Form.Control
                            type={type}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            placeholder={placeholder}
                            required={required}
                            isInvalid={!!error}
                        />
                        <Form.Control.Feedback type="invalid" className="error_msg ms-3 p-0">
                            {error}
                        </Form.Control.Feedback>
                    </>
                )}
            </Col>
        </Form.Group>
    );
};

// Component InlineSelectField.....

export const InlineSelectField = ({
    label,
    name,
    value,
    handleChange,
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
            <Col sm={inputCol} className="position-relative">
                <Form.Select
                    name={name}
                    value={value}
                    onChange={handleChange}
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
                <Form.Control.Feedback type="invalid" className='error_msg ms-3 p-0'>
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
    handleChange,
    required = false,
    error,
    controlId,
}) => {
    return (
        <Form.Group as={Row} className="mb-3 inlineForm" controlId={controlId}>
            <Form.Label column sm="4">
                {label}
            </Form.Label>
            <Col sm="8" className="position-relative">
                {options.map((option, idx) => (
                    <div key={`${name}-${option.value}-${idx}`} className="m-0">
                        <Form.Check
                            type="radio"
                            name={name}
                            id={`${name}-${option.value}`}
                            label={option.label}
                            value={option.value}
                            required={required}
                            checked={value === option.value}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {error && (
                    <Form.Control.Feedback type="invalid" className="error_msg error_msg_no_input ms-3 p-0">
                        {error}
                    </Form.Control.Feedback>
                )}
            </Col>
        </Form.Group>
    );
};

// Component OffCanvas.....

export const OffCanvas = ({
    show,
    onHide,
    onSubmit,
    placement = 'end',
    title = 'Offcanvas Title',
    subtitle = "Modal Sub Title",
    name = 'Open',
    children,
    className="",
    footerButtonSubmit = "Submit",
    footerButtonCancel = "Cancel",
    footerButtonSubmitClass = "",
    footerButtonCancelClass = "",
}) => {
    return (
        <>
            <Offcanvas show={show} onHide={onHide} placement={placement} backdrop="static" className={className}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className='ModalTopIcon'>
                            <i className='ModalIcon'>
                                <Image src={Images.ModalIcon} />
                            </i>
                        </div>
                        <div className='ModalTopHeading'>
                            <h4>{title}</h4>
                            <p>{subtitle}</p>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className='gx-3'>
                        {children}
                    </Row>
                </Offcanvas.Body>
                <div className='offcanvas-footer'>
                    <Button className={footerButtonCancelClass} onClick={onHide}>{footerButtonCancel}</Button>
                    <Button className={footerButtonSubmitClass} onClick={onSubmit}>{footerButtonSubmit}</Button>
                </div>
            </Offcanvas>
        </>
    );
};


export const CustomToast = ({
    title,
    message,
    onClose,
    type,
}) => {
    const iconSrc =
        type === "success"
        ? Images.SuccessCheck
        : type === "error"
        ? Images.ErrorClose
        : Images.InfoIcon; // default if no type matches
    return (
        // <Toast onClose={onClose} show={true} autoClose={false} delay={3000} className='CustomToast'>
        <Toast
            onClose={onClose}
            show={true}
            autohide={true} // ✅ enable auto close
            delay={3000}
            className={`CustomToast ${type === "success" ? "toast-success" : ""} ${type === "error" ? "toast-error" : ""}`}
        >
            <Toast.Header>
                <img src={iconSrc} className="rounded me-2" alt={`${type} icon`} />
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};


export const getComboLabel = (comboName, key) => {
    const comboArray = ComboDate[comboName];
    if (!comboArray) return 'Nil';

    const item = comboArray.find(entry => entry.key === String(key));
    return item ? item.label : 'Nil';
};



