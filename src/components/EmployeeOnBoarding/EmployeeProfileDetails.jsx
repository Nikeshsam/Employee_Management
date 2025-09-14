import React, { useState, useEffect } from 'react';
import Images from '../../pages/Images.jsx';
import { getLoggedEmployee } from '../../api/index.js';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import ComboDate from '../../data/Combo.json';

import 'bootstrap/dist/css/bootstrap.css';

function EmployeeProfileCard() {
    const { loginUser } = useLoginUser(); // ✅ you already have loginUser context
    const [employeeProfile, setEmployeeProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await getLoggedEmployee(loginUser.token);
                //console.log("Logged Employee API Response:", response.data);
                setEmployeeProfile(response.data.data);
            } catch (error) {
                //console.error("Failed to fetch logged employee:", error);
            } finally {
                setLoading(false);
                //console.log(employeeProfile);
            }
        };

        if (loginUser?.token) {
            fetchEmployee();
        }
    }, [loginUser]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!employeeProfile) {
        return <p>No employee details found.</p>;
    }

    const getDepartmentLabel = (val) => {
        const dept = ComboDate.Department.find(
            (d) => String(d.value) === String(val) // ensure type-safe comparison
        );
        return dept ? dept.label : val;
    };

    const getDesignationLabel = (val) => {
        const desig = ComboDate.Designation.find(
            (d) => String(d.value) === String(val)
        );
        return desig ? desig.label : val;
    };



    return (
        <div className="employee_profile_container">
            <div className='employee_profile_pic_content'>
                <div className='employee_profile_pic'>
                    <img
                        src={employeeProfile.profilePic || Images.UserName}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                    />
                </div>
                <div className='employee_profile_content'>
                    <h5 className="mb-0">
                        <label>{`${employeeProfile.firstName} ${employeeProfile.lastName}`}</label>
                        <span className="badge">{employeeProfile.status}</span>
                    </h5>
                    <p>{getDesignationLabel(employeeProfile.designation)}</p>
                    <a href="#">{employeeProfile.employeeId}</a>
                </div>
            </div>

            <div className="employee_profile_details">
                <label>Department</label>
                <span>{getDepartmentLabel(employeeProfile.department)}</span>
            </div>
            <div className="employee_profile_details">
                <label>Joining Date</label>
                {/* <span>{employeeProfile.joiningDate}</span> */}
                <span>03-07-2025</span>
            </div>
            <div className="employee_profile_details">
                <label>Employment Type</label>
                <span>{employeeProfile.employmentType}</span>
            </div>
            <div className="employee_profile_details">
                <label>Manager</label>
                {/* <span>{employeeProfile.manager}</span> */}
                <span>Muthu Kumar</span>
            </div>
            <div className="employee_profile_details">
                <label>Work Location</label>
                <span>{employeeProfile.workLocation}</span>
            </div>

            {employeeProfile.offerLetter && (
                <div className="employee_offer_letter">
                    <a href="#">
                        <img
                            src={Images.OfferLetter}
                            alt="Offer Letter"
                            className="offer_letter_icon"
                        />
                        {employeeProfile.offerLetter.fileName}
                    </a>
                </div>
            )}
        </div>
    );
}

export default EmployeeProfileCard;
