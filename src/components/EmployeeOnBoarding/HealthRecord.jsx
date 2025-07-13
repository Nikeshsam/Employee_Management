import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, SelectInput } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const HealthRecord = () => {
  const [vaccinations, setVaccination] = useState([
    {
      key: '1',
      VaccinationName: 'Covid',
      DateofDose: 'Nov 24, 1999'
    }
  ])

  const [BloodGroup, setBloodGroup] = useState([
    { key: '1', label: 'O positive' },
    { key: '2', label: 'O negative' },
    { key: '3', label: 'A positive' },
    { key: '4', label: 'B positive' },
    { key: '5', label: 'B negative' },
    { key: '6', label: 'AB positive' },
    { key: '7', label: 'AB negative' },
  ])

  // FORM INPUT

  // FormData Validations

    const [formData, setFormData] = useState({
        bloodgroup: '',
        allergyintolerance: '',
        preexisting: '',
    });

    // Error useState

    const [errors, setErrors] = useState({
        bloodgroup: '',
        allergyintolerance: '',
        preexisting: '',
    });


    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'bloodgroup':
                if (!value.trim()) error = 'Blood Group is required';
                break;

            case 'allergyintolerance':
                if (!value.trim()) error = 'Allergy Intolerance is required';
                break;

            case 'preexisting':
                if (!value.trim()) error = 'Pre Existing is required';
                break;             

            default:
                break;
        }

        return error;
    };

    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
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
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const navigate  = useNavigate();

  return (
    <CardForm
      onSubmit={handleSubmit}
      footerButtonSubmit="Submit"
      footerButtonSubmitClass="primary_form_btn btn_h_35"
    >
      <Col md={12} lg={12} xl={12} xxl={12}>
        <h5 className='MainTitle'>Health Details</h5>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <SelectInput
          label="Blood Group"
          name="bloodgroup"
          options={BloodGroup}
          placeholder="Select BloodGroup"
          error={errors.bloodgroup}
          value={formData.bloodgroup}
          handleChange={handleChange}   
          required       
        />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form>
          <Form.Label>Blood Donor</Form.Label>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
          />
        </Form>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Allergy Intolerance"
          name="allergyintolerance"
          type="text"
          placeholder="Allergy Intolerance"
          error={errors.allergyintolerance}
          value={formData.allergyintolerance}
          handleChange={handleChange}
          required
        />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Pre-Existing Illness"
          name="preexisting"
          type="text"
          placeholder="Pre-Existing Illness"
          error={errors.preexisting}
          value={formData.preexisting}
          handleChange={handleChange}
          required
        />
      </Col>
      <Col md={12} lg={12} xl={12} xxl={12}>
        <PrimaryGird
          cardTitle="Vaccination"
          buttonText="Add Vaccination"

          showAddButton={true}
          showFilterButton={false}
          showDeleteButton={false}
          showFooter={false}

          onButtonClick={() => console.log('Add Visa Clicked')}
          tableHeaders={['Vaccination Name', 'Date of Dose', 'Actions']}
        >
          {vaccinations.map((vaccination) => (
            <tr key={vaccination.key}>
              <td>{vaccination.VaccinationName}</td>
              <td>{vaccination.DateofDose}</td>
              <td className='table_action'>
                <Button className="btn_action"><img src={Images.Edit} alt="" /></Button>
                <Button className="btn_action"><img src={Images.Delete} alt="" /></Button>
              </td>
            </tr>
          ))}
        </PrimaryGird>
      </Col>
    </CardForm>
  )
}

export default HealthRecord