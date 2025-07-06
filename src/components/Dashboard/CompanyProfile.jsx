import React, { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';
import { CardForm, CardFromTertiary } from '../../pages/Props';

// Bootstrap imports



const CompanyProfile = () => {

  // Industry

  const [Industry, setIndustry] = useState([
    {key: '1', label:'Agriculture'},
    {key: '2', label:'Forestry'},
    {key: '3', label:'Fishing'},
    {key: '4', label:'Mining'},
    {key: '5', label:'Oil & Gas Extraction'},
    {key: '6', label:'Construction'},
    {key: '7', label:'Manufacturing'},
    {key: '8', label:'Utilities'},
    {key: '9', label:'Insurance'},
    {key: '10', label:'Healthcare & Pharmaceuticals'},
  ])

  const [selectIndustry, setSelectIndustry] = useState('');

  const handleIndustryChange = (e) => {
    setSelectIndustry(e.target.value)
  };

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

  const [selectBusinessType, setSelectBusinessType] = useState ('');

  const handleBusinessChange = (e) => {
    setSelectBusinessType(e.target.value)
  };

  // Fiscal Year

  const [FiscalYear, setFiscalYear] = useState([
    { key: '1', label: 'January – December' },
    { key: '2', label: 'April – March' },
    { key: '3', label: 'July – June' },
    { key: '4', label: 'October – September' }
  ])

  const [selectFiscalYear, setSelectFiscalYear] = useState ('');

  const handleFiscalYearChange = (e) => {
    setSelectFiscalYear(e.target.value)
  };

  // Time Zone

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

  const [selectTimeZone, setSelectTimeZone] = useState('');

  const handleTimeZoneChange = (e) => {
    setSelectTimeZone(e.target.value)
  };

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

  const [selectDateFormat, setSelectDateFormat] = useState('');

  const handleDateFormatChange = (e) => {
    setSelectDateFormat(e.target.value)
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12} lg={12} xl={12} xxl={12}>
          <CardFromTertiary>

            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Organization Name
              </Form.Label>
              <Col sm="6">
                <Form.Control type="text" placeholder="Organization Name" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Industry
              </Form.Label>
              <Col sm="6">
                <Form.Select aria-label="Default select example" value={selectIndustry} onChange={handleIndustryChange}>
                  <option>Select Industry</option>
                  {Industry.map((IndustryItem) => (
                    <option key={IndustryItem.key} value={IndustryItem.key}>
                      {IndustryItem.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Business Type
              </Form.Label>
              <Col sm="6">
                <Form.Select aria-label="Default select example" value={selectBusinessType} onChange={handleBusinessChange}>
                  <option>Select Business Type</option>
                  {BusinessType.map((BusinessTypeList) => (
                    <option key={BusinessTypeList.key} value={BusinessTypeList.key}>
                      {BusinessTypeList.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Company Address
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder="Street" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
              </Form.Label>
              <Col sm="5">
                <Form.Control type="text" placeholder="Street" />
              </Col>
              <Col sm="4">
                <Form.Control type="text" placeholder="City" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
              </Form.Label>
              <Col sm="3">
                <Form.Control type="text" placeholder="State / Province" />
              </Col>
              <Col sm="3">
                <Form.Control type="text" placeholder="Zip / Postal Code" />
              </Col>
              <Col sm="3">
                <Form.Select aria-label="Default select example">
                  <option>India</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
              </Form.Label>
              <Col sm="3">
                <Form.Control type="text" placeholder="Phone" />
              </Col>
              <Col sm="3">
                <Form.Control type="text" placeholder="Fax" />
              </Col>
              <Col sm="3">
                <Form.Control type="text" placeholder="Website" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Fiscal Year
              </Form.Label>
              <Col sm="6">
                <Form.Select aria-label="Default select example" value={selectFiscalYear} onChange={handleFiscalYearChange}>
                  <option>Select Fiscal Year</option>
                  {FiscalYear.map((FiscalYearList) => (
                    <option key={FiscalYearList.key} value={FiscalYearList.key}>
                      {FiscalYearList.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Tax Basis
              </Form.Label>
              <Col sm="6">
                {['radio'].map((type) => (
                  <div key={`default-${type}-accrual`} className="m-0">
                    <Form.Check // prettier-ignore
                      type={type}
                      name="taxMethod"
                      id={`accrual${type}`}
                      label={`Accrual (you owe tax as of invoice date)`}
                    />
                  </div>
                ))}
                {['radio'].map((type) => (
                  <div key={`default-${type}-cash`} className="m-0">
                    <Form.Check // prettier-ignore
                      type={type}
                      name="taxMethod"
                      id={`cash${type}`}
                      label={`Cash (you owe tax upon receiving payments)`}
                    />
                  </div>
                ))}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Time Zone
              </Form.Label>
              <Col sm="6">
                <Form.Select aria-label="Default select example">
                  <option>Select Time Zone</option>
                  {TimeZone.map((TimeZoneList) => (
                    <option key={TimeZoneList.key} value={TimeZoneList.key}>
                      {TimeZoneList.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Date Format
              </Form.Label>
              <Col sm="6">
                <Form.Select aria-label="Default select example">
                  <option>Select Date Format</option>
                  {DateFormat.map((DateFormatList) => (
                    <option key={DateFormatList.key} value={DateFormatList.key}>
                      {DateFormatList.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Company ID :
              </Form.Label>
              <Col sm="6">
                <Form.Control type="text" placeholder="Ex: 53 004 085 616" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 inlineForm" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Tax ID :
              </Form.Label>
              <Col sm="6">
                <Form.Control type="text" placeholder="Ex: 9XX-70-XXXX" />
              </Col>
            </Form.Group>
          </CardFromTertiary>
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyProfile
