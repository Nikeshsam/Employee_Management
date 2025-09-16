import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SunSet from '../../assets/Images/sunset.svg';
import { useLoginUser } from '../../context/LoginUserContext';
import { getLoggedEmployee } from '../../api';

const TopMenu = ({ title, activeTab }) => {
  const { loginUser } = useLoginUser();
  const [employeeProfile, setEmployeeProfile] = useState(null);

  // Fetch employee profile if user is employee
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getLoggedEmployee(loginUser.token);
        //console.log("Logged Employee API Response:", response.data);
        setEmployeeProfile(response.data.data);
      } catch (error) {
        //console.error("Failed to fetch logged employee:", error);
      } finally {
        //setLoading(false);
        //console.log(employeeProfile);
      }
    };

    if (loginUser?.token) {
      fetchEmployee();
    }
  }, [loginUser]);



  // Greeting logic
  const hour = new Date().getHours();
  let greeting = "Good Morning,";
  if (hour >= 12 && hour < 16) greeting = "Good Afternoon,";
  else if (hour >= 16 || hour < 5) greeting = "Good Evening,";

  return (
    <div className='topmenu'>
      <div className='topmenu_content'>
        <h1>{activeTab}</h1>
        <div className='greeting'>
          <i><img src={SunSet} alt="sunset" /></i>
          <span>{greeting}</span>
          <label>
            {loginUser?.user?.role === "admin"
              ? loginUser?.user?.name
              : employeeProfile
                ? `${employeeProfile.firstName || ""} ${employeeProfile.lastName || ""}`
                : ""}
          </label>
        </div>
      </div>
      <div className='topmenu_search'>
        <input type="text" placeholder='Quick Search' />
      </div>
    </div>
  );
};

export default TopMenu;
