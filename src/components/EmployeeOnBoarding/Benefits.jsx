import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Benefits = () => {
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

  return (
    <CardForm
      //onSubmit={handleSubmit}
      footerButtonSubmit="Submit"
      footerButtonSubmitClass="primary_form_btn btn_h_35"
    >
      <Col md={12} lg={12} xl={12} xxl={12}>
        <PrimaryGird
          cardTitle="Dependents"
          buttonText="Add Dependents"

          showAddButton={true}
          showFilterButton={false}
          showDeleteButton={false}
          showFooter={false}

          onButtonClick={() => console.log('Add Visa Clicked')}
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
  )
}

export default Benefits