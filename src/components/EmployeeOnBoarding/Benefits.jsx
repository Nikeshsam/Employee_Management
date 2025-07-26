import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, OffCanvas } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';
import {benefitsValidateField} from '../Validations/Validate.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Benefits = () => {

  const [showWorkBenefitsCanvas, setShowBenefitsCanvas] = useState(false);
  const handleShowBenefitsCanvas = () => setShowBenefitsCanvas(true);
  const handleCloseBenefitsCanvas = () => setShowBenefitsCanvas(false);

  const [dependents, setDependents] = useState([
    {
      key: '1',
      Name: 'Lonard',
      Relationship: 'Children',
      Gender: 'Male',
      IDNumber: '1009-0992-2902',
      DateBirth: 'Feb 04, 1990',
    },
    {
      key: '2',
      Name: 'Mathew',
      Relationship: 'Spouse',
      Gender: 'Male',
      IDNumber: '1009-0992-2902',
      DateBirth: 'Nov 24, 1963',
    }
  ])

   // FormData Validations

  const [formData, setFormData] = useState({
    dname: '',
    relationship: '',
    gender: '',
    idnumber: '',
    dob: '',
  });

  // Error useState

  const [errors, setErrors] = useState({
  });




  //  Validate Form with Error

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = benefitsValidateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/Home'); // 
      console.log('Form submitted:', formData);
    }
  };

  //  Handle Change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = benefitsValidateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const navigate = useNavigate();

  return (
    <>
      <CardForm
        //onSubmit={handleSubmit}
        footerButtonSubmit="Save"
        footerButtonSubmitClass="primary_form_btn btn_h_35"
      >
        <Col md={12} lg={12} xl={12} xxl={12}>
          <PrimaryGird
            cardTitle="Dependents"
            buttonText="Add Benefits"
            showAddButton={true}
            showFilterButton={false}
            showDeleteButton={false}
            showFooter={false}
            onButtonClick={handleShowBenefitsCanvas}
            tableHeaders={['Name', 'Relationship', 'Gender', 'ID Number', 'Date of Birth', 'Actions']}
          >
            {dependents.map((dependent) => (
              <tr key={dependent.key}>
                <td>{dependent.Name}</td>
                <td>{dependent.Relationship}</td>
                <td>{dependent.Gender}</td>
                <td>{dependent.IDNumber}</td>
                <td>{dependent.DateBirth}</td>
                <td className='table_action'>
                  {/* <Button className="btn_action"><img src={Images.Edit} alt="" /></Button>
                <Button className="btn_action"><img src={Images.Delete} alt="" /></Button> */}
                </td>
              </tr>
            ))}
          </PrimaryGird>
        </Col>
      </CardForm>

      <OffCanvas
        show={showWorkBenefitsCanvas}
        placement="end"
        onSubmit={handleSubmit}
        onHide={handleCloseBenefitsCanvas}
        title="Add Benefits"
        subtitle="Start your 7-day free trial."
        className='PrimaryCanvasModal'
        name="Add Benefits"
        footerButtonSubmit="Add Benefits"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      >
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your Name"
            controlId="dname"
            name="dname"
            error={errors.dname}
            value={formData.dname}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Relationship"
            type="text"
            placeholder="Enter your Relationship"
            controlId="relationship"
            name="relationship"
            error={errors.relationship}
            value={formData.relationship}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Gender"
            type="text"
            placeholder="Enter your Gender"
            controlId="gender	"
            name="gender"
            error={errors.gender}
            value={formData.gender}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="ID Number"
            type="text"
            placeholder="Enter your ID Number"
            controlId="idnumber"
            name="idnumber"
            error={errors.idnumber}
            value={formData.idnumber}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Date of Birth"
            type="date"
            placeholder="Enter your Date of Birth"
            controlId="dob"
            name="dob"
            error={errors.dob}
            value={formData.dob}
            handleChange={handleChange}
            required
          />
        </Col>
      </OffCanvas>
    </>
  )
}

export default Benefits