import React, { useState, useEffect } from 'react';
import { getLoggedEmployee } from '../../api/index.js';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import { SecondaryGrid } from "../../pages/Props.jsx";
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, CardHeader, CardBody } from 'react-bootstrap';

const UserInfo = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div className="infoContiner">
            <div className="infoHeader">
              <div className="infoProfilePic">
                <div className="userProfile"></div>
              </div>
              <div className="infoData">
                <div className="userName">
                  <h5>Nikesh (Nikesh) Balu</h5>
                  <span>Senior Designer</span>
                </div>
                <div className="userFooter">
                  <ul>
                    <li>EMPSH002</li>
                    <li>
                      <i><img src={Images.PI_DOB} alt="" /></i>
                      <span>23-07-1992 - 33</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Gender} alt="" /></i>
                      <span>Male</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Married} alt="" /></i>
                      <span>Married</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Flag} alt="" /></i>
                      <span>Indian</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="infoContent">
              <div className="infoLeft">
                <div className="infoPersonal">
                  <h6>Vitals</h6>
                  <ul>
                    <li>
                      <i><img src={Images.PI_Mobile} alt="" /></i>
                      <span>8056243765</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Mail} alt="" /></i>
                      <span>nikesh.designer@gmail.com</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Clock} alt="" /></i>
                      <span>3:43 PM local time</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Location} alt="" /></i>
                      <span>India</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Setting} alt="" /></i>
                      <span>Senior Designer - <label htmlFor="">Full-Time</label></span>
                    </li>
                    <li>
                      <i><img src={Images.PI_RD} alt="" /></i>
                      <span>R&D</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Office} alt="" /></i>
                      <span>Captiv Techno Solutions (India) Private</span>
                    </li>
                  </ul>
                </div>
                <div className="infoPersonal">
                  <h6>Hire Date</h6>
                  <ul>
                    <li>
                      <i><img src={Images.PI_Calendar} alt="" /></i>
                      <span>Sep 29, 2025 - <label htmlFor="">2m - 2d</label></span>
                    </li>
                  </ul>
                </div>
                <div className="infoPersonal">
                  <h6>Manager</h6>
                  <ul>
                    <li>
                      <div className='Manager'>
                        <i></i>
                        <div className='ManagerName'>
                          <span>Jason Chien</span>
                          <label htmlFor="">Head of UX - TW</label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="infoRight">
                <Card className='InfoCard'>
                  <CardHeader>
                    <h5>Contact</h5>
                  </CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp pt-0'>
                      <Row>
                        <Col md={6} className='d-flex flex-column gap-2'>
                          <h4 className='pb-1'>Current Address</h4>
                          <address>Plot no.B, Sampath Enclave, Vijaya Lakshmi Nagar, Nanmangalam, Kovilambakkam, Chennai - 600117</address>
                        </Col>
                        <Col md={6} className='d-flex flex-column gap-2'>
                          <h4 className='pb-1'>Permanent Address</h4>
                          <address>Plot no.B, Sampath Enclave, Vijaya Lakshmi Nagar, Nanmangalam, Kovilambakkam, Chennai - 600117</address>
                        </Col>
                      </Row>
                    </div>
                    <div className='cardGrp pb-0'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h4 className='pb-1'>Contact Details</h4>
                          <SecondaryGrid
                            tableHeaders={[
                              "Primary Phone Number",
                              "Alternate Phone Number",
                              "Personal Email Address",
                            ]}
                          >
                            <tr>
                              <td>8056243765</td>
                              <td>8946026844</td>
                              <td>nikesh.designer@gmail.com</td>
                            </tr>
                          </SecondaryGrid>
                        </Col>
                      </Row>
                    </div>
                    <div className='cardGrp pb-0'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h4 className='pb-1'>Emergency Contact Details</h4>
                          <SecondaryGrid
                            tableHeaders={[
                              "Relation Name",
                              "Relationship",
                              "Phone Number",
                              "Email Address",
                            ]}
                          >
                            <tr>
                              <td>Balaji</td>
                              <td>Friend</td>
                              <td>9876543210</td>
                              <td>balaji.nanban@gmail.com</td>
                            </tr>
                          </SecondaryGrid>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card className='InfoCard'>
                  <CardHeader>
                    <h5>Family</h5>
                  </CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <div className='ReadOnlyCard mb-3'>
                            <div className='CustomCol col-2'>
                              <i><img src={Images.ViewFamily} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">Name</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Relationship</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Date of Birth</label>
                                <span>28-10-1993</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Education</label>
                                <span>MSC</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Occupation</label>
                                <span>House wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Dependent in benefits</label>
                                <span>Yes</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <div className='ReadOnlyCard'>
                            <div className='CustomCol col-2'>
                              <i><img src={Images.ViewFamily} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">Name</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Relationship</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Date of Birth</label>
                                <span>28-10-1993</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Education</label>
                                <span>MSC</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Occupation</label>
                                <span>House wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Dependent in benefits</label>
                                <span>Yes</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card className='InfoCard'>
                  <CardHeader>
                    <h5>Education</h5>
                  </CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0 pt-1'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Academic Qualifications</h6>
                          <div className='ReadOnlyCard mb-3'>
                            <div className='CustomCol col-2'>
                              <i><img src={Images.ViewAcademic} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">Degree</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Major</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">University</label>
                                <span>28-10-1993</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Year</label>
                                <span>MSC</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Cgpa</label>
                                <span>House wife</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Certifications</h6>
                          <div className='ReadOnlyCard'>
                            <div className='CustomCol col-2'>
                              <i><img src={Images.ViewCertificate} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">Name</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">issued by</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">issued date</label>
                                <span>28-10-1993</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">expiry date</label>
                                <span>MSC</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">additional info</label>
                                <span>House wife</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card className='InfoCard'>
                  <CardHeader>
                    <h5>Work Experience</h5>
                  </CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0 pt-1'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <div className='ReadOnlyCard mb-3'>
                            <div className='CustomCol col-2'>
                              <i><img src={Images.ViewExperience} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">organization</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">location</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">job title</label>
                                <span>28-10-1993</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">start date</label>
                                <span>MSC</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">end date</label>
                                <span>House wife</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <div className='ReadOnlyCard'>
                            <div className='CustomCol col-2'>
                              <i><img src={Images.ViewExperience} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">organization</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">location</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">job title</label>
                                <span>28-10-1993</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">start date</label>
                                <span>MSC</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">end date</label>
                                <span>House wife</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card className='InfoCard'>
                  <CardHeader>
                    <h5>Benefits</h5>
                  </CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0 pt-1'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Coverage Summary</h6>
                          <div className='ReadOnlyCard mb-3'>
                            <div className='CustomCol col-2'>
                              <i><img src={Images.ViewCoverage} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">benefit</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">effective</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">coverage</label>
                                <span>28-10-1993</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">frequency</label>
                                <span>MSC</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">status</label>
                                <span>House wife</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Dependent Details</h6>
                          <div className='ReadOnlyCard'>
                            <div className='CustomCol col-2'>
                              <i><img src={Images.ViewDependent} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">name</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">relationship</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">gender</label>
                                <span>28-10-1993</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">id number</label>
                                <span>MSC</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">date of birth</label>
                                <span>House wife</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card className='InfoCard'>
                  <CardHeader>
                    <h5>Health Record</h5>
                  </CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-1'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Passport Details</h6>
                          <SecondaryGrid
                            tableHeaders={[
                              "Blood Group",
                              "Blood Donor",
                              "Allergy Intolerance",
                              "Pre-Existing Illness",
                            ]}
                          >
                            <tr>
                              <td>O Positive</td>
                              <td>Yes</td>
                              <td>Amoxicillin</td>
                              <td>Hypertension</td>
                            </tr>
                          </SecondaryGrid>
                        </Col>
                      </Row>
                    </div>
                    <div className='cardGrp border-0 pb-0 pt-1'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Vaccinations</h6>
                          <div className='ReadOnlyCard'>
                            <div className='CustomCol col-3'>
                              <i><img src={Images.ViewVaccinations} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">Vaccination Name</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-9'>
                              <div className='Content'>
                                <label htmlFor="">Date of Dose</label>
                                <span>Wife</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card className='InfoCard'>
                  <CardHeader>
                    <h5>Passport Details</h5>
                  </CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-1'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Passport Details</h6>
                          <SecondaryGrid
                            tableHeaders={[
                              "Passport No",
                              "Issued By",
                              "Date of Issue",
                              "Date of Expiry",
                            ]}
                          >
                            <tr>
                              <td>M1234567</td>
                              <td>India</td>
                              <td>21-11-2025</td>
                              <td>20-11-2035</td>
                            </tr>
                          </SecondaryGrid>
                        </Col>
                      </Row>
                    </div>
                    <div className='cardGrp border-0 pb-0 pt-1'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Visa Details</h6>
                          <div className='ReadOnlyCard'>
                            <div className='CustomCol col-3'>
                              <i><img src={Images.ViewVisa} alt="" /></i>
                              <div className='Content'>
                                <label htmlFor="">Visa Number</label>
                                <span>Eswari Name</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Issued Date</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Place of Issue</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Expiry Date</label>
                                <span>Wife</span>
                              </div>
                            </div>
                            <div className='CustomCol col-2'>
                              <div className='Content'>
                                <label htmlFor="">Notes</label>
                                <span>Wife</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default UserInfo
