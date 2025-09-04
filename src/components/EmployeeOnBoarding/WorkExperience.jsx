import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, CustomToast, PrimaryGird, CustomModalConfirmDialog, InputField, OffCanvas } from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import Images from '../../pages/Images.jsx';
import { workExperienceValidateField } from '../Validations/Validate.jsx';
import Loader from '../Common/Loader.jsx';
import { createOrUpdateEmployeeExperienceDetails, deleteEmployeeExperience, getEmployeeExperienceDetails } from '../../api/index.js';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const WorkExperience = () => {

  // Canvas useState

  const [showWorkExperienceCanvas, setShowWorkExperienceCanvas] = useState(false);
  const handleShowWorkExperienceCanvas = () => setShowWorkExperienceCanvas(true);
  const handleCloseWorkExperienceCanvas = () => setShowWorkExperienceCanvas(false);

  const [workExperiences, setWorkExperience] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const { loginUser } = useLoginUser();
  const [toastList, setToastList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const handleToastClose = (index) => {
    const updatedList = toastList.filter((_, i) => i !== index);
    setToastList(updatedList);
  };

  const handleClearClick = () => {
    setModalShow(false);
    setExperienceToDelete(null); // If you’re using employeeToDelete state
  };

  // FormData Validations

  const [formData, setFormData] = useState({
    _id: '',
    organization: '',
    location: '',
    jobTitle: '',
    startDate: '',
    endDate: '',
  });

  // Error useState

  const [errors, setErrors] = useState({});

  //  Validate Form with Error

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = workExperienceValidateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const addExperience = {
        _id: formData._id,
        organization: formData.organization,
        location: formData.location,
        jobTitle: formData.jobTitle,
        startDate: formData.startDate,
        endDate: formData.endDate
      };
      if (editingIndex !== null) {
        setWorkExperience((prev) =>
          prev.map((member, idx) => (idx === editingIndex ? addExperience : member))
        );
      } else {
        setWorkExperience((prev) => [...prev, addExperience]);
      }

      setToastList((prev) => [
        ...prev,
        {
          title: "Success",
          message: editingIndex !== null
            ? "Experience updated successfully!"
            : "Experience added successfully!",
          type: "success"
        },
      ]);
      setFormData({
        organization: '',
        location: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
      });
      setEditingIndex(null);
      //resetForm();   // <-- clear everything here
      setShowWorkExperienceCanvas(false);
    }
  };

  useEffect(() => {
    const fetchExperienceDetial = async () => {
      try {
        const response = await getEmployeeExperienceDetails(loginUser.token);
        if (!response) {
          console.log("No Data Found");
          return;
        }
        setWorkExperience(response.data.experiences);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExperienceDetial();
  }, [loginUser.token]);

  const fetchExperience = async () => {
    try {
      const response = await getEmployeeExperienceDetails(loginUser.token);
      if (!response) {
        console.log("No Data Found");
        return;
      }
      setWorkExperience(response.data.experiences);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSaveAll = async () => {
    try {
      setSubmitting(true);

      const newExperience = workExperiences; // only new
      if (newExperience.length === 0) {
        setToastList((prev) => [
          ...prev,
          { title: "Info", message: "No new Experience to save", type: "error" },
        ]);
        return;
      }

      const apiData = {
        experiences: newExperience.map(experience => ({
          _id: experience._id,
          organization: experience.organization,
          location: experience.location,
          jobTitle: experience.jobTitle,
          startDate: experience.startDate,
          endDate: experience.endDate
        }))
      };
      console.log(apiData);
      //return;

      await createOrUpdateEmployeeExperienceDetails(apiData, loginUser.token);

      setToastList((prev) => [
        ...prev,
        { title: "Success", message: "Experience saved successfully!", type: "success" },
      ]);
      await fetchExperience();
    } catch (error) {
      console.error("Error saving Experience:", error);
    } finally {
      setSubmitting(false);
    }
  };

  //  Handle Change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = workExperienceValidateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  // handleEdit (clean version for experiences)
  const handleEdit = (index) => {
    const exp = workExperiences[index];
    setFormData({
      _id: exp._id || '',
      organization: exp.organization || '',
      location: exp.location || '',
      jobTitle: exp.jobTitle || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
    });
    setEditingIndex(index);
    setShowWorkExperienceCanvas(true);
  };


  const handleDeleteExperience = async () => {
    const member = workExperiences[indexToDelete];
    setWorkExperience((prev) => prev.filter((_, i) => i !== indexToDelete));

    if (member._id) {
      try {
        const response = await deleteEmployeeExperience(member._id, loginUser.token);
        setToastList(prev => [
          ...prev,
          {
            title: `${experienceToDelete.name}`,
            message: 'Experience deleted successfully',
            type: "success", // success type
          }
        ]);
        setModalShow(false);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

  };

  const navigate = useNavigate();

  return (

    <>
      {submitting ? <Loader /> : (
        <CardForm
          onSubmit={handleSaveAll}
          footerButtonSubmit="Save"
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
              onButtonClick={handleShowWorkExperienceCanvas}
              tableHeaders={['Organization', 'Location', 'Job Title', 'Start Date', 'End Date', 'Actions']}
            >
              {submitting ? (
                <Loader />
              ) : (
                Array.isArray(workExperiences) && workExperiences.length > 0 ? (
                  workExperiences.map((experience, index) => {
                    return (
                      <tr key={experience._id || index}>
                        <td>{experience.organization}</td>
                        <td>{experience.location}</td>
                        <td>{experience.jobTitle}</td>
                        <td>{experience.startDate}</td>
                        <td>{experience.endDate}</td>
                        <td className='table_action'>
                          <Button
                            className="btn_action"
                            onClick={() => handleEdit(index)}
                          >
                            <img src={Images.Edit} alt="Edit" />
                          </Button>
                          <Button
                            className="btn_action"
                            onClick={() => {
                              setExperienceToDelete(experience);
                              setIndexToDelete(index);
                              setModalShow(true);
                            }}
                          >
                            <img src={Images.Delete} alt="Delete" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      No Family Members Added
                    </td>
                  </tr>
                )
              )}
            </PrimaryGird>
          </Col>
        </CardForm>
      )}
      <OffCanvas
        show={showWorkExperienceCanvas}
        placement="end"
        onSubmit={handleSubmit}
        onHide={handleCloseWorkExperienceCanvas}
        title={editingIndex !== null ? "Update Work Experience" : "Add Work Experience"}
        subtitle={editingIndex !== null ? "Update the details of your work experience." : "Add your past work experience."}
        className='PrimaryCanvasModal'
        name={editingIndex !== null ? "Update Experience" : "Add Experience"}
        footerButtonSubmit={editingIndex !== null ? "Update Experience" : "Add Experience"}
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      >
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Organization"
            type="text"
            placeholder="Enter your First Organization"
            controlId="organization"
            name="organization"
            error={errors.organization}
            value={formData.organization}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Location"
            type="text"
            placeholder="Enter your Location"
            controlId="location"
            name="location"
            error={errors.location}
            value={formData.location}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Job Title"
            type="text"
            placeholder="Enter your Job Title"
            controlId="jobTitle	"
            name="jobTitle"
            error={errors.jobTitle}
            value={formData.jobTitle}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Start Date"
            type="date"
            placeholder="Enter your Start Date"
            controlId="startDate"
            name="startDate"
            error={errors.startDate}
            value={formData.startDate}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="End Date"
            type="date"
            placeholder="Enter your End Date"
            controlId="endDate"
            name="endDate"
            error={errors.endDate}
            value={formData.endDate}
            handleChange={handleChange}
            required
          />
        </Col>
      </OffCanvas>
      <ToastContainer position="top-end" className="p-3">
        {toastList.map((toast, index) => (
          <CustomToast
            key={index}
            title={toast.title}
            message={toast.message}
            img={toast.img}
            type={toast.type}
            onClose={() => handleToastClose(index)} // If your component supports this
          />
        ))}
      </ToastContainer>

      <CustomModalConfirmDialog
        show={modalShow}
        onHide={handleClearClick}
        title="Delete Experience"
        size="md"
        subtitle='This action cannot be undone.'
        className='ConfirmDialogModal delete'
        showSubmitButton={true}
        showCancelButton={true}
        bodyContent={
          <>
            <div className='ConfirmContainer'>
              <div className='ConfirmIcon'>
                <img src={Images.ConfirmDelete} alt="Delete" />
              </div>
              {experienceToDelete && (
                <div className='ConfirmContent'>
                  <h5>Delete Experience</h5>
                  <p>Are you sure you want to delete this employee <span>{`${experienceToDelete.name}`}</span>? This action cannot be undo.</p>
                </div>
              )}
            </div>
          </>
        }
        onSubmit={handleDeleteExperience}
        footerButtonSubmit="Delete"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_danger_btn"
        footerButtonCancelClass="modal_primary_border_btn"
      />
    </>
  )
}

export default WorkExperience