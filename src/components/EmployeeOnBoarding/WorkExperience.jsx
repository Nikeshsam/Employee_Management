import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const WorkExperience = () => {
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
  return (
    <CardForm
      //onSubmit={handleSubmit}
      footerButtonSubmit="Submit"
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

          onButtonClick={() => console.log('Add Visa Clicked')}
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
  )
}

export default WorkExperience