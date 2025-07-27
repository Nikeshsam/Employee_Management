import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Images from '../../pages/Images.jsx';
import { CardFromTertiary, OffCanvas, InlineInputField, getComboLabel, CustomModalConfirmDialog, InlineSelectField, RadioGroupField } from '../../pages/Props';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import { getOrganizationDetails, organizationDetails, editOrganization } from '../../api/index.js';
import { organizationvalidateField } from '../Validations/Validate.jsx';
import ComboDate from '../../data/Combo.json';


// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Image, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const CompanyProfile = ({ openCanvas }) => {

  const { loginUser, setLoginUser, saveLoginUser } = useLoginUser();
  const [modalShow, setModalShow] = useState(false);
  const handleClearClick = () => {
    setModalShow(false);
    navigate('/Home'); // Navigate after modal closes
  };

  // Company Profile Canvas

  const location  = useLocation();
  const [showCompanyProfileCanvas, setShowCompanyProfileCanvas] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (openCanvas) {
      setShowCompanyProfileCanvas(true);
    }
  }, [openCanvas]);


  // Company Profile Edit
  const [isEditing, setIsEditing] = useState(false);

  // Industry

  useEffect(() => {
    if (loginUser.companyProfileStatus) {
      fetchData();
    }
  }, [])

  const fetchData = async () => {
    try {
      const { data } = await getOrganizationDetails(loginUser.token);
      console.log(data.organization);
      setFormData(data.organization);
      setViewData(data.organization);
    } catch (error) {
      console.log(error);
    }
  }
  // Combo List

  const [Industry, setIndustry] = useState(ComboDate.Industry);
  const [BusinessType, setBusinessType] = useState(ComboDate.BusinessType);
  const [FiscalYear, setFiscalYear] = useState(ComboDate.FiscalYear);
  const [TimeZone, setTimeZone] = useState(ComboDate.TimeZone);
  const [DateFormat, setDateFormat] = useState(ComboDate.DateFormat);

  // Combo List

  // FormData Validations

  const [formData, setFormData] = useState({
    companyLogo: '',
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
    company: '',
  });
  // Error useState

  const [viewData, setViewData] = useState({});

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     try {
  //       const response = await organizationDetails(formData, loginUser.token);
  //       console.log(response.data.message);
  //       setSubmitMessage(response.data.message);
  //       saveLoginUser({ ...loginUser, companyProfileStatus: true });
  //       setModalShow(true); // <-- Show modal here after success
  //       setShowCompanyProfileCanvas(false);
  //       console.log('Form submitted:', formData);
  //       fetchData();
  //     } catch (error) {
  //       console.log(error);
  //       setSubmitMessage(error?.response?.data?.message || 'Submission failed');
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let response;

        // let formToSend = new FormData();
        // Object.keys(formData).forEach(key => {
        //   formToSend.append(key, formData[key]);
        // });

        if (isEditing) {
          // Add _id to formData if not already
          //formToSend.append('_id', viewData._id);
          console.log(formData)
          response = await editOrganization(formData, loginUser.token, viewData._id);
        } else {
          response = await organizationDetails(formData, loginUser.token);
        }

        console.log(response.data.message);
        setSubmitMessage(response.data.message);
        saveLoginUser({ ...loginUser, companyProfileStatus: true });
        setModalShow(true);
        setShowCompanyProfileCanvas(false);
        setIsEditing(false); // Reset edit mode
        fetchData(); // Refresh view
      } catch (error) {
        console.log(error);
        setSubmitMessage(error?.response?.data?.message || 'Submission failed');
      }
    }
  };

  //  Handle Change

  const handleChange = (e) => {
  const { name, value, type, files } = e.target;
    if (type === 'file') {
      const fileData = files?.[0];
      if (fileData) {
        setFormData(prev => ({ ...prev, [name]: fileData }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Clear error for file input
        return;
      } else {
        setErrors(prevErrors => ({ ...prevErrors, [name]: 'Company Logo is required' })); // Set error for file input
        return;
      }
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
      const error = organizationvalidateField(name, value);
      setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    }
  };

  const handlEdit = () =>{
    setFormData(viewData);
    setShowCompanyProfileCanvas(true);
    setIsEditing(true); // set to edit mode
    setPreviewUrl(`data:image/png;base64,${viewData.companyLogo}`);
  }



  const navigate = useNavigate();

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12} lg={12} xl={12} xxl={12}>
            <CardFromTertiary
              footerButtonSubmit="Edit"
              footerButtonSubmitClass="btn btn-primary btn_h_35 mb-2 pe-4 ps-4 secondary_btn"
              footerButtonSubmitOnClick={handlEdit}
            >
              <Row>
                <Col md={12} lg={12} xl={12} xxl={12}>
                  <div className="cpViewContainer">
                    <div className='cpViewWrap'>
                      <div className='cpViewLogoContainer'>
                        <div className='cpViewLogo'>
                          <img className='img-fluid' src={viewData.companyLogo?`data:image/png;base64,${viewData.companyLogo}`:null} alt="" />
                        </div>
                        <div className='cpViewSection'>
                          <label htmlFor="">Organization Name </label>
                          <span className='color-1 text-decoration-underline'>{viewData.organizationName || 'Nil'}</span>
                        </div>
                      </div>
                      <div className='cpViewSection extra_icon CID'>
                        <label htmlFor="">Company ID</label>
                        <span>{viewData.companyID || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection extra_icon TID'>
                        <label htmlFor="">Tax ID</label>
                        <span className='color-4'>{viewData.taxID || 'Nil'}</span>
                      </div>
                    </div>
                    <div className='cpViewcol'>
                      <div className='cpViewSection'>
                        <label htmlFor="">Industry</label>
                        <span>{getComboLabel('Industry', viewData.industry) || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection'>
                        <label htmlFor="">Business Type</label>
                        <span>{getComboLabel('BusinessType', viewData.businessType) || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection'>
                        <label htmlFor="">Country</label>
                        <span>{viewData.country || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection'>
                        <label htmlFor="">Phone Number</label>
                        <span className='color-2'>{viewData.phoneNumber || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection'>
                        <label htmlFor="">Fax Number</label>
                        <span className='color-3'>{viewData.faxNumber || 'Nil'}</span>
                      </div>
                    </div>
                    <div className='cpViewcol'>
                      <div className='cpViewSection'>
                        <label htmlFor="">Website</label>
                        <span>{viewData.website || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection'>
                        <label htmlFor="">Fiscal</label>
                        <span>{getComboLabel('FiscalYear', viewData.fiscal) || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection'>
                        <label htmlFor="">Tax Method</label>
                        <span className='color-5'>{viewData.taxMethod || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection'>
                        <label htmlFor="">Time Zone</label>
                        <span>{getComboLabel('TimeZone', viewData.timeZone) || 'Nil'}</span>
                      </div>
                      <div className='cpViewSection'>
                        <label htmlFor="">Date Format</label>
                        <span>{getComboLabel('DateFormat', viewData.dateFormat) || 'Nil'}</span>
                      </div>
                    </div>
                    <div className='cpViewcol'>
                      <div className='cpViewSection w-100'>
                        <label htmlFor="">Company Address</label>
                        <span>{`${viewData.companyAddress} ${viewData.street} ${viewData.city} ${viewData.state} ${viewData.zipCode || 'Nil'}`}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardFromTertiary>
          </Col>
        </Row>
      </Container>

      <OffCanvas
        onSubmit={handleSubmit}
        show={showCompanyProfileCanvas}
        onHide={() => {setShowCompanyProfileCanvas(false); setIsEditing(false);}}
        placement="end"
        title="Add Organization Profile"
        subtitle="Complete the profile to get started"
        className='PrimaryCanvasModal CPProfile'
        name="Add Family"
        footerButtonSubmit={isEditing ? "Update Profile" : "Add Profile"}
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      >
        <InlineInputField
          label="Your Logo"
          name="companyLogo"
          placeholder="Your Logo"
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          error={errors.companyLogo}
          value={formData.companyLogo}
          handleChange={handleChange}
          type='file'
          required
          labelCol={4}
          inputCol={8}
        />
        <InlineInputField
          label="Organization Name"
          name="organizationName"
          placeholder="Organization Name"
          error={errors.organizationName}
          value={formData.organizationName}
          handleChange={handleChange}
          required
          labelCol={4}
          inputCol={8}
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
          labelCol={4}
          inputCol={8}
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
          labelCol={4}
          inputCol={8}
        />
        <InlineInputField
          label="Company Address"
          name="companyAddress"
          placeholder="Company Address"
          error={errors.companyAddress}
          value={formData.companyAddress}
          handleChange={handleChange}
          required
          labelCol={4}
          inputCol={8}
        />
        <Row className='no_label'>
          <Col md={4} lg={4} xl={4} xxl={4}></Col>
          <Col md={8} lg={8} xl={8} xxl={8}>
            <Row>
              <Col md={6} lg={6} xl={6} xxl={6}>
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
              <Col md={6} lg={6} xl={6} xxl={6}>
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
          <Col md={4} lg={4} xl={4} xxl={4}></Col>
          <Col md={8} lg={8} xl={8} xxl={8}>
            <Row>
              <Col md={6} lg={6} xl={6} xxl={6}>
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
              <Col md={6} lg={6} xl={6} xxl={6}>
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
            </Row>
          </Col>
        </Row>
        <Row className='no_label'>
          <Col md={4} lg={4} xl={4} xxl={4}></Col>
          <Col md={8} lg={8} xl={8} xxl={8}>
            <Row>
              <Col md={6} lg={6} xl={6} xxl={6}>
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
              <Col md={6} lg={6} xl={6} xxl={6}>
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
            </Row>
          </Col>
        </Row>
        <Row className='no_label'>
          <Col md={4} lg={4} xl={4} xxl={4}></Col>
          <Col md={8} lg={8} xl={8} xxl={8}>
            <Row>
              <Col md={6} lg={6} xl={6} xxl={6}>
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
              <Col md={6} lg={6} xl={6} xxl={6}>
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
          labelCol={4}
          inputCol={8}
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
          labelCol={4}
          inputCol={8}
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
          labelCol={4}
          inputCol={8}
        />
        <InlineInputField
          label="Tax ID"
          name="taxID"
          placeholder="Tax ID"
          value={formData.taxID}
          handleChange={handleChange}
          error={errors.taxID}
          required
          labelCol={4}
          inputCol={8}
        />
        <InlineInputField
          label="Company ID"
          name="companyID"
          placeholder="Company ID"
          value={formData.companyID}
          handleChange={handleChange}
          error={errors.companyID}
          required
          labelCol={4}
          inputCol={8}
        />
      </OffCanvas>

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
        onSubmit={handleClearClick}
        footerButtonSubmit="Dashboard"
        footerButtonSubmitClass="modal_success_btn"
        footerButtonCancelClass="modal_primary_border_btn"
      />
    </>
  )
}

export default CompanyProfile
