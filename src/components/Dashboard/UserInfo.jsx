import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, CardHeader, CardBody } from 'react-bootstrap';
import { getEmployeeDetails } from '../../api/index.js';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import { SecondaryGrid } from "../../pages/Props.jsx";
import Images from '../../pages/Images.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import ComboDate from '../../data/Combo.json';

const UserInfo = () => {
  const { loginUser } = useLoginUser();
  //console.log(loginUser, "hi");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const EmptyState = ({ message }) => (
    <div className="ReadOnlyCard emptyState text-center mb-3">
      <span className="text-muted">{message}</span>
    </div>
  );

  const TableEmptyRow = ({ colSpan, message }) => (
    <tr>
      <td colSpan={colSpan} className="text-center text-muted py-3">
        {message}
      </td>
    </tr>
  );

  const BloodGroup = ComboDate.BloodGroup;

  const getBloodGroupLabel = (value) => {
    const match = BloodGroup.find(
      (item) => item.value === value
    );
    return match ? match.label : "-";
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        if (!loginUser) return;

        setLoading(true);

        const employeeId =
          loginUser?.employeeId ||
          loginUser?.user?.id ||
          loginUser?.employee?.id ||
          loginUser?.id;

        const token =
          loginUser?.token ||
          loginUser?.user?.token;

        console.log("Resolved employeeId:", employeeId);
        console.log("Resolved token:", token);

        if (!employeeId || !token) {
          console.warn("Employee ID or token missing");
          setEmployee(null);
          return;
        }

        const response = await getEmployeeDetails(token);
        const data = response.data;

        console.log("employeeDependentDetails:", data.employeeDependentDetails);

        setEmployee({
          basic: {
            fullName: `${data.employeeBasicDetails?.firstName || ""} ${data.employeeBasicDetails?.lastName || ""}`,
            designation: data.employee?.designation,
            employeeCode: data.employee?.employeeId,
            dob: data.employeeBasicDetails?.dateOfBirth,
            age: data.employeeBasicDetails?.age,
            gender: data.employeeBasicDetails?.gender,
            maritalStatus: data.employeeBasicDetails?.maritalStatus,
            nationality: data.employeeBasicDetails?.nationality,
          },

          job: {
            designation: data.employee?.designation,
            employmentType: data.employee?.employmentType,
            department: data.employee?.department,
            company: "Your Company",
            hireDate: data.employee?.joiningDate,
          },

          manager: {}, // You don't have manager data yet

          family: data.employeeDependentDetails || [],
          academicQualifications: data.employeeEducationDetails || [],
          certifications: data.employeeCertifications || [],
          experience: data.employeeExperience || [],
          coverageSummary: data.employeeBenefits || [],
          dependentDetails: data.employeeDependentDetails || [],
          vaccinations: data.employeeHealthRecord?.vaccinations || [],
          visaDetails: data.employeeTravelDetails?.[0]?.visaDetails || [],

          contact: {
            mobile: data.employeeContactDetails?.primaryMobileNo,
            alternateMobile: data.employeeContactDetails?.secondaryMobileNo,
            email: data.employeeContactDetails?.email,
            currentAddress: data.employeeContactDetails?.currentAddress?.addressLine1,
            permanentAddress: data.employeeContactDetails?.permanentAddress?.addressLine1,
          },

          emergency: [
            {
              relationName: data.employeeContactDetails?.relationName,
              relationship: data.employeeContactDetails?.relationship,
              phoneNumber: data.employeeContactDetails?.relationContactNo,
              emailAddress: data.employeeContactDetails?.relationEmail,
            },
          ],

          healthDetails: data.employeeHealthRecord
            ? [data.employeeHealthRecord]
            : [],

          passportDetails:
            data.employeeTravelDetails || [],
        });


      } catch (error) {
        console.error("Failed to fetch employee details", error);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [loginUser]);



  if (loading) {
    return (
      <div className="text-center p-5">
        Loading employee details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center p-5 text-danger">
        Unable to load employee details
      </div>
    );
  }

  const {
    basic = {},
    job = {},
    manager = {},
    family = [],
    academicQualifications = [],
    certifications = [],
    experience = [],
    coverageSummary = [],
    dependentDetails = [],
    vaccinations = [],
    visaDetails = [],
    contact = {},
    emergency = [],
    healthDetails = [],
    passportDetails = [],
  } = employee;

  const formatDate = (date) => {
    if (!date) return "";
    return date.split("T")[0].split("-").reverse().join("-");
  };

  /* ================= NORMALIZATION ================= */
  const passport = Array.isArray(passportDetails)
    ? passportDetails[0]
    : passportDetails;

  const emergencyContact = Array.isArray(emergency)
    ? emergency[0]
    : emergency;

  const health = Array.isArray(healthDetails)
    ? healthDetails[0]
    : healthDetails;

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div className="infoContiner">

            {/* ================= HEADER ================= */}
            <div className="infoHeader">
              <div className="infoProfilePic">
                <div className="userProfile"></div>
              </div>

              <div className="infoData">
                <div className="userName">
                  <h5>{basic.fullName}</h5>
                  <span>{basic.designation}</span>
                </div>

                <div className="userFooter">
                  <ul>
                    <li>{basic.employeeCode}</li>
                    <li>
                      <i><img src={Images.PI_DOB} alt="" /></i>
                      <span>{formatDate(basic.dob)} - <b>{basic.age}</b></span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Gender} alt="" /></i>
                      <span>{basic.gender}</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Married} alt="" /></i>
                      <span>{basic.maritalStatus}</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Flag} alt="" /></i>
                      <span>{basic.nationality}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="infoContent">

              {/* LEFT */}
              <div className="infoLeft">
                <div className="infoPersonal">
                  <h6>Vitals</h6>
                  <ul>
                    <li>
                      <i><img src={Images.PI_Mobile} alt="" /></i>
                      <span>{contact.mobile}</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Mail} alt="" /></i>
                      <span>{contact.email}</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Clock} alt="" /></i>
                      <span>{contact.timeZone}</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Location} alt="" /></i>
                      <span>{contact.country}</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Setting} alt="" /></i>
                      <span>
                        {job.designation}
                        <label> {job.employmentType}</label>
                      </span>
                    </li>
                    <li>
                      <i><img src={Images.PI_RD} alt="" /></i>
                      <span>{job.department}</span>
                    </li>
                    <li>
                      <i><img src={Images.PI_Office} alt="" /></i>
                      <span>{job.company}</span>
                    </li>
                  </ul>
                </div>

                <div className="infoPersonal">
                  <h6>Hire Date</h6>
                  <ul>
                    <li>
                      <i><img src={Images.PI_Calendar} alt="" /></i>
                      <span>{formatDate(job.hireDate)}</span>
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
                          <span>{manager.name}</span>
                          <label htmlFor="">{manager.designation}</label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT */}
              <div className="infoRight">

                {/* CONTACT */}
                <Card className="InfoCard">
                  <CardHeader><h5>Contact</h5></CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp pt-0'>
                      <Row>
                        <Col md={6} className='d-flex flex-column gap-2'>
                          <h4 className='pb-1'>Current Address</h4>
                          <address>{contact.currentAddress}</address>
                        </Col>
                        <Col md={6} className='d-flex flex-column gap-2'>
                          <h4 className='pb-1'>Permanent Address</h4>
                          <address>{contact.permanentAddress}</address>
                        </Col>
                      </Row>
                    </div>
                    <div className='cardGrp pb-0'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h4 className='pb-1'>Contact Details</h4>
                          <SecondaryGrid
                            tableHeaders={[
                              "Primary Phone",
                              "Alternate Phone",
                              "Email"
                            ]}
                          >
                            {contact?.mobile ||
                              contact?.alternateMobile ||
                              contact?.email ? (
                              <tr>
                                <td>{contact?.mobile || "-"}</td>
                                <td>{contact?.alternateMobile || "-"}</td>
                                <td>{contact?.email || "-"}</td>
                              </tr>
                            ) : <TableEmptyRow colSpan={4} message="No contact details available" />}
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
                              "Email Address"
                            ]}
                          >
                            {emergencyContact?.relationName ||
                              emergencyContact?.relationship ||
                              emergencyContact?.phoneNumber ||
                              emergencyContact?.emailAddress ? (
                              <tr>
                                <td>{emergencyContact?.relationName || "-"}</td>
                                <td>{emergencyContact?.relationship || "-"}</td>
                                <td>{emergencyContact?.phoneNumber || "-"}</td>
                                <td>{emergencyContact?.emailAddress || "-"}</td>
                              </tr>
                            ) : (
                              <TableEmptyRow colSpan={4} message="No emergency contact details available" />
                            )}
                          </SecondaryGrid>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>

                {/* FAMILY */}
                <Card className="InfoCard">
                  <CardHeader><h5>Family</h5></CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0 pt-2'>
                      <Row>
                        <Col md={12} className="d-flex flex-column gap-2">
                          {family.length > 0 ? (
                            family.map((f, i) => (
                              <div className="ReadOnlyCard mb-2" key={i}>
                                <div className='CustomCol col-2'>
                                  <i><img src={Images.ViewFamily} alt="" /></i>
                                  <div className='Content'>
                                    <label htmlFor="">NAME</label>
                                    <span>{f.name || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">RELATIONSHIP</label>
                                    <span>{f.relationship || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">DATE OF BIRTH</label>
                                    <span>{formatDate(f.dateOfBirth) || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">EDUCATION</label>
                                    <span>{f.education || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">OCCUPATION</label>
                                    <span>{f.occupation || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">DEPENDENT IN BENEFITS</label>
                                    <span>{f.dependentBenefit ? "Yes" : "No" || '-'}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : <EmptyState message="No family details available" />}
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>

                {/* EDUCATION */}
                <Card className="InfoCard">
                  <CardHeader><h5>Education</h5></CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0 pt-1'>
                      <Row>
                        <Col md={12} className="d-flex flex-column gap-2">
                          <h6 className='subHeading'>Academic Qualifications</h6>
                          {academicQualifications.length > 0 ? (
                            academicQualifications.map((a, i) => (
                              <div className="ReadOnlyCard mb-3" key={i}>
                                <div className='CustomCol col-2'>
                                  <i><img src={Images.ViewAcademic} alt="" /></i>
                                  <div className='Content'>
                                    <label htmlFor="">Degree</label>
                                    <span>{a.degree || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Major</label>
                                    <span>{a.major || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">University</label>
                                    <span>{a.university || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Year</label>
                                    <span>{formatDate(a.year) || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">CGPA</label>
                                    <span>{a.percentage || "-"}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : <EmptyState message="No academic qualifications details available" />}
                        </Col>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Certifications</h6>
                          {certifications.length > 0 ? (
                            certifications.map((c, i) => (
                              <div className="ReadOnlyCard mb-3" key={i}>
                                <div className='CustomCol col-3'>
                                  <i><img src={Images.ViewCertificate} alt="" /></i>
                                  <div className='Content'>
                                    <label htmlFor="">Name</label>
                                    <span>{c.name || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-3'>
                                  <div className='Content'>
                                    <label htmlFor="">Issued By</label>
                                    <span>{c.issuedBy || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-3'>
                                  <div className='Content'>
                                    <label htmlFor="">Issued Date</label>
                                    <span>{formatDate(c.issuedDate) || "-"}</span>
                                  </div>
                                </div>
                                {/* <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Expiry Date</label>
                                    <span>{c.year?.split("T")[0] || "-"}</span>
                                  </div>
                                </div> */}
                                <div className='CustomCol col-3'>
                                  <div className='Content'>
                                    <label htmlFor="">Additional Info</label>
                                    <span>{c.additionalInfo}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : <EmptyState message="No certifications details available" />}
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>

                {/* EXPERIENCE */}
                <Card className="InfoCard">
                  <CardHeader><h5>Work Experience</h5></CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0 pt-2'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          {experience.length > 0 ? (
                            experience.map((e, i) => (
                              <div className="ReadOnlyCard mb-2" key={i}>
                                <div className='CustomCol col-4'>
                                  <i><img src={Images.ViewCertificate} alt="" /></i>
                                  <div className='Content'>
                                    <label htmlFor="">Organization</label>
                                    <span>{e.organization || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-1'>
                                  <div className='Content'>
                                    <label htmlFor="">Location</label>
                                    <span>{e.location || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-3'>
                                  <div className='Content'>
                                    <label htmlFor="">Job Title</label>
                                    <span>{e.jobTitle || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Start Date</label>
                                    <span>{formatDate(e.startDate) || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">End Date</label>
                                    <span>{formatDate(e.endDate) || '-'}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : <EmptyState message="No work experience details available" />}
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>

                {/* BENEFITS */}
                <Card className="InfoCard">
                  <CardHeader><h5>Benefits</h5></CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0 pt-1'>
                      <Row>
                        {/* <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Coverage Summary</h6>
                          {coverageSummary.length > 0 ? (
                            coverageSummary.map((c, i) => (
                              <div className="ReadOnlyCard mb-2" key={i}>
                                <div className='CustomCol col-2'>
                                  <i><img src={Images.ViewCoverage} alt="" /></i>
                                  <div className='Content'>
                                    <label htmlFor="">benefit</label>
                                    <span>{c.name}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Effective</label>
                                    <span>{c.relationship}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Coverage</label>
                                    <span>{c.gender}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Frequency</label>
                                    <span>{c.idNumber}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Status</label>
                                    <span>{c.DoB}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : <EmptyState message="No benefits details available" />}
                        </Col> */}
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Dependent Details</h6>
                          {dependentDetails.length > 0 ? (
                            dependentDetails.map((d, i) => (
                              <div className="ReadOnlyCard mb-2" key={i}>
                                <div className='CustomCol col-2'>
                                  <i><img src={Images.ViewDependent} alt="" /></i>
                                  <div className='Content'>
                                    <label htmlFor="">name</label>
                                    <span>{d.name || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">relationship</label>
                                    <span>{d.relationship || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">gender</label>
                                    <span>{d.gender || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">id number</label>
                                    <span>{d.idNumber || '-'}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">date of birth</label>
                                    <span>{d.DoB || '-'}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : <EmptyState message="No dependent details available" />}
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>

                {/* HEALTH RECORD */}
                <Card className="InfoCard">
                  <CardHeader><h5>Health Record</h5></CardHeader>
                  <CardBody className='p-0'>
                    <div className='cardGrp border-0 pb-0 pt-1'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Health Details</h6>
                          <SecondaryGrid
                            tableHeaders={[
                              "Blood Group",
                              "Blood Donor",
                              "Allergy Intolerance",
                              "Pre-Existing Illness",
                            ]}
                          >
                            {health?.bloodGroup ||
                              health?.isBloodDonor ||
                              health?.allergies ||
                              health?.preExistingIllnesses ? (
                              <tr>
                                <td>{getBloodGroupLabel(health?.bloodGroup)}</td>
                                <td>{health?.isBloodDonor || "-"}</td>
                                <td>{health?.allergies || "-"}</td>
                                <td>{health?.preExistingIllnesses || "-"}</td>
                              </tr>
                            ) : (
                              <TableEmptyRow colSpan={4} message="No health details available" />
                            )}
                          </SecondaryGrid>
                        </Col>
                      </Row>
                    </div>
                    <div className='cardGrp border-0 pb-0 pt-0'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Vaccinations</h6>
                          {vaccinations.length > 0 ? (
                            vaccinations.map((v, i) => (
                              <div className="ReadOnlyCard mb-2" key={i}>
                                <div className='CustomCol col-2'>
                                  <i><img src={Images.ViewVaccinations} alt="" /></i>
                                  <div className='Content'>
                                    <label htmlFor="">Vaccination Name</label>
                                    <span>{v.vaccinationName || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Date of Dose</label>
                                    <span>{formatDate(v.vcDateOfDose) || "-"}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : <EmptyState message="No vaccinations details available" />}
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>

                {/* TRAVEL DETAILS */}
                <Card className="InfoCard">
                  <CardHeader><h5>Travel Details</h5></CardHeader>
                  <CardBody className='p-0'>
                    <div className="cardGrp border-0 pb-0 pt-1">
                      <Row>
                        <Col md={12} className="d-flex flex-column gap-2">
                          <h6 className="subHeading">Passport Details</h6>
                          <SecondaryGrid
                            tableHeaders={[
                              "Passport No",
                              "Issued By",
                              "Date of Issue",
                              "Date of Expiry",
                            ]}
                          >
                            {passport?.passportNo ||
                              passport?.issuedBy ||
                              passport?.dateOfIssue ||
                              passport?.dateOfExpiry ? (
                              <tr>
                                <td>{passport?.passportNo || "-"}</td>
                                <td>{passport?.issuedBy || "-"}</td>
                                <td>{formatDate(passport?.dateOfIssue) || "-"}</td>
                                <td>{formatDate(passport?.dateOfExpiry) || "-"}</td>
                              </tr>
                            ) : (
                              <TableEmptyRow colSpan={4} message="No passport details available" />
                            )}

                          </SecondaryGrid>
                        </Col>
                      </Row>
                    </div>
                    <div className='cardGrp border-0 pb-0 pt-0'>
                      <Row>
                        <Col md={12} className='d-flex flex-column gap-2'>
                          <h6 className='subHeading'>Visa Details</h6>
                          {visaDetails.length > 0 ? (
                            visaDetails.map((v, i) => (
                              <div className="ReadOnlyCard mb-2" key={i}>
                                <div className='CustomCol col-2'>
                                  <i><img src={Images.ViewVisa} alt="" /></i>
                                  <div className='Content'>
                                    <label htmlFor="">Visa Number</label>
                                    <span>{v.visaNumber}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Issued Date</label>
                                    <span>{formatDate(v.issuedDate) || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Place of Issue</label>
                                    <span>{v.placeOfIssue || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Expiry Date</label>
                                    <span>{formatDate(v.expiryDate) || "-"}</span>
                                  </div>
                                </div>
                                <div className='CustomCol col-2'>
                                  <div className='Content'>
                                    <label htmlFor="">Notes</label>
                                    <span>{v.notes}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : <EmptyState message="No visa details available" />}
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
  );
};

export default UserInfo;
