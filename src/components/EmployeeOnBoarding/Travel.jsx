import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Travel = () => {
  const [Visas, setVisas] = useState([
    {
      key: '1',
      VisaNumber: 'VISA10024578',
      IssuedDate: '2022-04-10',
      PlaceofIssue: 'New Delhi',
      ExpiryDate: '2025-04-09',
      Notes: 'Business Visa, Multiple Entry',
    },
    {
      key: '2',
      VisaNumber: 'VISA20317891',
      IssuedDate: '2023-07-01',
      PlaceofIssue: 'Mumbai',
      ExpiryDate: '2026-06-30',
      Notes: 'Tourist Visa, Single Entry',
    }
  ])

  // FORM INPUT

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <CardForm
      //onSubmit={handleSubmit}
      footerButtonSubmit="Submit"
      footerButtonSubmitClass="primary_form_btn btn_h_35"
    >
      <Col md={12} lg={12} xl={12} xxl={12}>
        <h5 className='MainTitle'>Passport Details</h5>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Passport No"
          type="text"
          placeholder="Enter your Passport No"
          controlId="PassportNo"
          name="PassportNo"
          value={formData.PassportNo}
          onChange={handleChange}
          required
        />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Issued By"
          type="text"
          placeholder="Enter your Issued By"
          controlId="IssuedBy"
          name="IssuedBy"
          value={formData.IssuedBy}
          onChange={handleChange}
          required
        />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Date of Issue"
          type="date"
          placeholder="Enter your Date of Issue"
          controlId="DateIssue"
          name="DateIssue"
          value={formData.DateIssue}
          onChange={handleChange}
          required
        />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Date of Expiry"
          type="date"
          placeholder="Enter your Date of Expiry"
          controlId="DateExpiry"
          name="DateExpiry"
          value={formData.DateExpiry}
          onChange={handleChange}
          required
        />
      </Col>
      <Col md={12} lg={12} xl={12} xxl={12}>
        <PrimaryGird
          cardTitle="Visa Details"
          buttonText="Add Visa"

          showAddButton={true}
          showFilterButton={false}
          showDeleteButton={false}
          showFooter={false}

          onButtonClick={() => console.log('Add Visa Clicked')}
          tableHeaders={['Visa Number', 'Issued Date', 'Place of Issue', 'Expiry Date', 'Notes', 'Action']}
        >
          {Visas.map((Visa) => (
            <tr key={Visa.key}>
              <td>{Visa.VisaNumber}</td>
              <td>{Visa.IssuedDate}</td>
              <td>{Visa.PlaceofIssue}</td>
              <td>{Visa.ExpiryDate}</td>
              <td>{Visa.Notes}</td>
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

export default Travel