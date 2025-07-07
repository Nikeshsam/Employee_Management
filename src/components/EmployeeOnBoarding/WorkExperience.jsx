import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const WorkExperience = () => {
  const [WorkExperience, setWorkExperience] = useState([
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
    <CardForm>
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
          {WorkExperience.map((WorkExperiences) => (
            <tr key={WorkExperiences.key}>
              <td>{WorkExperiences.Organization}</td>
              <td>{WorkExperiences.Location}</td>
              <td>{WorkExperiences.JobTitle}</td>
              <td>{WorkExperiences.StartDate}</td>
              <td>{WorkExperiences.EndDate}</td>
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