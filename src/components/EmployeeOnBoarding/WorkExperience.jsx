import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, OffCanvas } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';
import { workExperienceValidateField } from '../Validations/Validate.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const WorkExperience = () => {

  // Canvas useState

  const [showWorkExperienceCanvas, setShowWorkExperienceCanvas] = useState(false);
  const handleShowWorkExperienceCanvas = () => setShowWorkExperienceCanvas(true);
  const handleCloseWorkExperienceCanvas = () => setShowWorkExperienceCanvas(false);

  const [workExperiences, setWorkExperience] = useState([
    {
      key: '1',
      Organization: 'Accenture',
      Location: 'Chennai',
      JobTitle: 'UI UX Designer',
      StartDate: '25-06-2023',
      EndDate: '25-06-2025',
    }
  ])

  // FormData Validations

  const [formData, setFormData] = useState({});

  // Error useState

  const [errors, setErrors] = useState({});

  //  Validate Form with Error

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = workExperienceValidateField(field, formData[field]);
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
    const error = workExperienceValidateField(name, value);
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
            cardTitle="Work Experience"
            buttonText="Add Work Experience"
            showAddButton={true}
            showFilterButton={false}
            showDeleteButton={false}
            showFooter={false}
            onButtonClick={handleShowWorkExperienceCanvas}
            tableHeaders={['Organization', 'Location', 'Job Title', 'Start Date', 'End Date', 'Actions']}
          >
            {workExperiences.map((workExperience) => (
              <tr key={workExperience.key}>
                <td>{workExperience.Organization}</td>
                <td>{workExperience.Location}</td>
                <td>{workExperience.JobTitle}</td>
                <td>{workExperience.StartDate}</td>
                <td>{workExperience.EndDate}</td>
                <td className='table_action'>
                  <Button className="btn_action"><img src={Images.Edit} alt="" /></Button>
                  <Button className="btn_action"><img src={Images.Delete} alt="" /></Button>
                </td>
              </tr>
            ))}
          </PrimaryGird>
        </Col>
      </CardForm>

      <OffCanvas
        show={showWorkExperienceCanvas}
        placement="end"
        onSubmit={handleSubmit}
        onHide={handleCloseWorkExperienceCanvas}
        title="Add Work Experience"
        subtitle="Start your 7-day free trial."
        name="Add Work Experience"
        footerButtonSubmit="Add Work Experience"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      >
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Organization"
            type="text"
            placeholder="Enter your First Organization"
            controlId="organization"
            name="organization"
            error={errors.organization}
            value={formData.organization}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Location"
            type="text"
            placeholder="Enter your Location"
            controlId="location"
            name="location"
            error={errors.location}
            value={formData.location}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Job Title"
            type="text"
            placeholder="Enter your Job Title"
            controlId="jobtitle	"
            name="jobtitle"
            error={errors.jobtitle}
            value={formData.jobtitle}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Start Date"
            type="date"
            placeholder="Enter your Start Date"
            controlId="startdate"
            name="startdate"
            error={errors.startdate}
            value={formData.startdate}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="End Date"
            type="date"
            placeholder="Enter your End Date"
            controlId="enddate"
            name="enddate"
            error={errors.enddate}
            value={formData.enddate}
            handleChange={handleChange}
            required
          />
        </Col>
      </OffCanvas>
    </>
  )
}

export default WorkExperience