import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Images from '../../pages/Images.jsx';
import { CardForm, CardFromTertiary, CustomModal, InlineInputField, CustomModalConfirmDialog, InlineSelectField, RadioGroupField } from '../../pages/Props';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import { getOrganizationDetails, organizationDetails } from '../../api/index.js';
import {organizationvalidateField} from '../Validations/Validate.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Image, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const CompanyProfile = () => {

  const { loginUser,setLoginUser,saveLoginUser } = useLoginUser();

  const [modalShow, setModalShow] = useState(false);

  const handleClearClick = () => {
    setModalShow(false);
    navigate('/dashboard'); // Navigate after modal closes
  };

  // Industry
  useEffect(()=>{
    if(loginUser.companyProfileStatus){
      fetchData();
    }
  },[])

    const fetchData = async()=>{
      try{
        const {data} = await getOrganizationDetails(loginUser.token);
        console.log(data.organization);
        setFormData(data.organization);
      }catch(error){
        console.log(error);
      }
    }

  const [Industry, setIndustry] = useState([
    { key: '1', label: 'Agriculture' },
    { key: '2', label: 'Forestry' },
    { key: '3', label: 'Fishing' },
    { key: '4', label: 'Mining' },
    { key: '5', label: 'Oil & Gas Extraction' },
    { key: '6', label: 'Construction' },
    { key: '7', label: 'Manufacturing' },
    { key: '8', label: 'Utilities' },
    { key: '9', label: 'Insurance' },
    { key: '10', label: 'Healthcare & Pharmaceuticals' },
  ])

  // Business Type

  const [BusinessType, setBusinessType] = useState([
    { key: '1', label: 'Sole Proprietorship' },
    { key: '2', label: 'Partnership' },
    { key: '3', label: 'Limited Liability Company (LLC)' },
    { key: '4', label: 'Corporation (C-Corp or S-Corp)' },
    { key: '5', label: 'Nonprofit Organization' },
    { key: '6', label: 'Franchise' },
    { key: '7', label: 'Cooperative' },
    { key: '8', label: 'Joint Venture' },
    { key: '9', label: 'Government-Owned Entity' },
    { key: '10', label: 'Holding Company' }
  ])

  // Fiscal Year

  const [FiscalYear, setFiscalYear] = useState([
    { key: '1', label: 'January – December' },
    { key: '2', label: 'April – March' },
    { key: '3', label: 'July – June' },
    { key: '4', label: 'October – September' }
  ])

  //////////////// Time Zone

  const [TimeZone, setTimeZone] = useState([
    { key: '1', label: '(UTC-12:00) International Date Line West', value: 'Etc/GMT+12' },
    { key: '2', label: '(UTC-11:00) Midway Island, Samoa', value: 'Pacific/Pago_Pago' },
    { key: '3', label: '(UTC-10:00) Hawaii', value: 'Pacific/Honolulu' },
    { key: '4', label: '(UTC-09:00) Alaska', value: 'America/Anchorage' },
    { key: '5', label: '(UTC-08:00) Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
    { key: '6', label: '(UTC-07:00) Mountain Time (US & Canada)', value: 'America/Denver' },
    { key: '7', label: '(UTC-06:00) Central Time (US & Canada)', value: 'America/Chicago' },
    { key: '8', label: '(UTC-05:00) Eastern Time (US & Canada)', value: 'America/New_York' },
    { key: '9', label: '(UTC-04:00) Atlantic Time (Canada)', value: 'America/Halifax' },
    { key: '10', label: '(UTC-03:00) Buenos Aires', value: 'America/Argentina/Buenos_Aires' },
    { key: '11', label: '(UTC-02:00) Mid-Atlantic', value: 'Etc/GMT+2' },
    { key: '12', label: '(UTC-01:00) Azores', value: 'Atlantic/Azores' },
    { key: '13', label: '(UTC+00:00) Greenwich Mean Time: Dublin, London', value: 'Europe/London' },
    { key: '14', label: '(UTC+01:00) Central European Time: Berlin, Paris', value: 'Europe/Berlin' },
    { key: '15', label: '(UTC+02:00) Eastern European Time: Athens, Cairo', value: 'Europe/Athens' },
    { key: '16', label: '(UTC+03:00) Moscow, Nairobi', value: 'Europe/Moscow' },
    { key: '17', label: '(UTC+03:30) Tehran', value: 'Asia/Tehran' },
    { key: '18', label: '(UTC+05:30) India Standard Time: Mumbai, New Delhi', value: 'Asia/Kolkata' },
    { key: '19', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta', value: 'Asia/Bangkok' },
    { key: '20', label: '(UTC+08:00) Beijing, Perth, Singapore', value: 'Asia/Shanghai' }
  ])

  // Date Format

  const [DateFormat, setDateFormat] = useState([
    { key: '1', label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { key: '2', label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { key: '3', label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { key: '4', label: 'DD MMM YYYY', value: 'DD MMM YYYY' },
    { key: '5', label: 'MMM DD, YYYY', value: 'MMM DD, YYYY' },
    { key: '6', label: 'DD.MM.YYYY', value: 'DD.MM.YYYY' },
    { key: '7', label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
    { key: '8', label: 'dddd, MMMM D, YYYY', value: 'dddd, MMMM D, YYYY' }
  ])

  // FormData useState

  // FormData Validations

  const [formData, setFormData] = useState({
    organizationName: '',
    industry: '',
    businessType: '',
    companyAddress: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
    faxNumber: '',
    website: '',
    fiscal: '',
    taxMethod: '',
    timeZone: '',
    dateFormat: '',
    companyID: '',
    taxID: '',
    company:'',
  });
  // Error useState

  const [errors, setErrors] = useState({});

  const [submitMessage, setSubmitMessage] = useState('');

  // Field Validations

  
  //  Validate Form with Error

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = organizationvalidateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const taxOptions = [
    {
      label: 'Accrual (you owe tax as of invoice date)',
      value: 'accrual',
    },
    {
      label: 'Cash (you owe tax upon receiving payments)',
      value: 'cash',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await organizationDetails(formData, loginUser.token);
        console.log(response.data.message);
        setSubmitMessage(response.data.message);
        saveLoginUser({ ...loginUser, companyProfileStatus: true });
        setModalShow(true); // <-- Show modal here after success
        console.log('Form submitted:', formData);
      } catch (error) {
        console.log(error);
        setSubmitMessage(error?.response?.data?.message || 'Submission failed');
      }
    }
  };

  //  Handle Change

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = organizationvalidateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const navigate = useNavigate();


  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12} lg={12} xl={12} xxl={12}>
            <CardFromTertiary
              onSubmit={handleSubmit}
              footerButtonSubmit="Submit"
              footerButtonSubmitClass="primary_form_btn btn_h_35"
            >
              <InlineInputField
                label="Organization Name"
                name="organizationName"
                placeholder="Organization Name"
                error={errors.organizationName}
                value={formData.organizationName}
                handleChange={handleChange}
                required
                labelCol={2}
                inputCol={6}
              />
              <InlineSelectField
                label="Industry"
                name="industry"
                placeholder="Select Industry"
                error={errors.industry}
                value={formData.industry}
                handleChange={handleChange}
                required
                options={Industry}
                labelCol={2}
                inputCol={6}
              />
              <InlineSelectField
                label="Business Type"
                name="businessType"
                placeholder="Select Business Type"
                error={errors.businessType}
                value={formData.businessType}
                handleChange={handleChange}
                required
                options={BusinessType}
                labelCol={2}
                inputCol={6}
              />
              <InlineInputField
                label="Company Address"
                name="companyAddress"
                placeholder="Company Address"
                error={errors.companyAddress}
                value={formData.companyAddress}
                handleChange={handleChange}
                required
                labelCol={2}
                inputCol={9}
              />
              <Row className='no_label'>
                <Col md={2} lg={2} xl={2} xxl={2}></Col>
                <Col md={9} lg={9} xl={9} xxl={9}>
                  <Row>
                    <Col md={8} lg={8} xl={8} xxl={8}>
                      <InlineInputField
                        name="street"
                        placeholder="Street"
                        error={errors.street}
                        value={formData.street}
                        handleChange={handleChange}
                        required
                        inputCol={12}
                      />
                    </Col>
                    <Col md={4} lg={4} xl={4} xxl={4}>
                      <InlineInputField
                        name="city"
                        placeholder="City"
                        error={errors.city}
                        value={formData.city}
                        handleChange={handleChange}
                        required
                        inputCol={12}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className='no_label'>
                <Col md={2} lg={2} xl={2} xxl={2}></Col>
                <Col md={9} lg={9} xl={9} xxl={9}>
                  <Row>
                    <Col md={4} lg={4} xl={4} xxl={4}>
                      <InlineInputField
                        name="state"
                        placeholder="State"
                        error={errors.state}
                        value={formData.state}
                        handleChange={handleChange}
                        required
                        inputCol={12}
                      />
                    </Col>
                    <Col md={4} lg={4} xl={4} xxl={4}>
                      <InlineInputField
                        name="country"
                        placeholder="country"
                        error={errors.country}
                        value={formData.country}
                        handleChange={handleChange}
                        required
                        inputCol={12}
                      />
                    </Col>
                    <Col md={4} lg={4} xl={4} xxl={4}>
                      <InlineInputField
                        name="zipCode"
                        placeholder="Zip Code"
                        error={errors.zipCode}
                        value={formData.zipCode}
                        handleChange={handleChange}
                        required
                        inputCol={12}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className='no_label'>
                <Col md={2} lg={2} xl={2} xxl={2}></Col>
                <Col md={9} lg={9} xl={9} xxl={9}>
                  <Row>
                    <Col md={4} lg={4} xl={4} xxl={4}>
                      <InlineInputField
                        name="phoneNumber"
                        placeholder="Phone Number"
                        error={errors.phoneNumber}
                        value={formData.phoneNumber}
                        handleChange={handleChange}
                        required
                        inputCol={12}
                      />
                    </Col>
                    <Col md={4} lg={4} xl={4} xxl={4}>
                      <InlineInputField
                        name="faxNumber"
                        placeholder="Fax Number"
                        error={errors.faxNumber}
                        value={formData.faxNumber}
                        handleChange={handleChange}
                        required
                        inputCol={12}
                      />
                    </Col>
                    <Col md={4} lg={4} xl={4} xxl={4}>
                      <InlineInputField
                        name="website"
                        placeholder="Website URL"
                        value={formData.website}
                        handleChange={handleChange}
                        error={errors.website}
                        required
                        inputCol={12}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <InlineSelectField
                label="Fiscal Year"
                name="fiscal"
                placeholder="Select fiscal Year"
                value={formData.fiscal}
                handleChange={handleChange}
                error={errors.fiscal}
                required
                options={FiscalYear}
                labelCol={2}
                inputCol={6}
              />
              <RadioGroupField
                label="Tax Basis"
                name="taxMethod"
                options={taxOptions}
                value={formData.taxMethod}
                handleChange={handleChange}
                error={errors.taxMethod}
                required
              />
              <InlineSelectField
                label="Time Zone"
                name="timeZone"
                placeholder="Select Time Zone"
                value={formData.timeZone}
                handleChange={handleChange}
                error={errors.timeZone}
                required
                options={TimeZone}
                labelCol={2}
                inputCol={6}
              />
              <InlineSelectField
                label="Date Format"
                name="dateFormat"
                placeholder="Select Date Format"
                value={formData.dateFormat}
                handleChange={handleChange}
                error={errors.dateFormat}
                required
                options={DateFormat}
                labelCol={2}
                inputCol={6}
              />
              <InlineInputField
                label="Tax ID"
                name="taxID"
                placeholder="Tax ID"
                value={formData.taxID}
                handleChange={handleChange}
                error={errors.taxID}
                required
                inputCol={6}
              />
              <InlineInputField
                label="Company ID"
                name="companyID"
                placeholder="Company ID"
                value={formData.companyID}
                handleChange={handleChange}
                error={errors.companyID}
                required
                inputCol={6}
              />
            </CardFromTertiary>
          </Col>
        </Row>
      </Container>

      <CustomModalConfirmDialog
        show={modalShow}
        onHide={handleClearClick}
        title="Organization Profile"
        size="md"
        subtitle='This action cannot be undone.'
        className='ConfirmDialogModal success'
        showSubmitButton={true}
        showCancelButton={false}        
        bodyContent={
          <>
            <div className='ConfirmContainer'>
              <div className='ConfirmIcon'>
                <img src={Images.ConfirmCheck} alt="Delete" />
              </div>
                <div className='ConfirmContent'>
                  <h5>Organization Profile</h5>
                  <p>Your organization details have been added successfully. You can now access our application.</p>
                </div>
            </div>
          </>
        }
        onSubmit={handleSubmit}
        footerButtonSubmit="Dashboard"
        footerButtonSubmitClass="modal_success_btn"
        footerButtonCancelClass="modal_primary_border_btn"
      />
    </>
  )
}

export default CompanyProfile