import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar from '../components/MenuSidebar/Sidebar.jsx';
import TopMenu from '../components/MenuSidebar/TopMenu.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import OnBoarding from '../components/Dashboard/OnBoarding.jsx';
import CompanyProfile from '../components/Dashboard/CompanyProfile.jsx';
import AddEmployee from '../components/Dashboard/AddEmployee.jsx';
import ManageHolidays from '../components/Dashboard/ManageHolidays.jsx';
import { useLoginUser } from '../context/LoginUserContext.jsx';

import CompleteProfile from '../components/Common/CompleteProfile.jsx';


const Home = () => {

    const location = useLocation();

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab); // switch tab on mount
        }
        if (location.state?.openCanvas) {
            setOpenCanvasFlag(true);
        }
    }, [location.state]);

    const user = {
        name: 'John Mathew',
    };
    const {loginUser} = useLoginUser();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [openCanvasFlag, setOpenCanvasFlag] = useState(false); // track if canvas should open
    const handleSidebarClick = (val) => {
        setActiveTab(val);
    }
    return (
        <>
        <div className='main_container'>
            <div className='sidebar'>
                <Sidebar handleSidebarClick={(val)=>handleSidebarClick(val)} activeTab={activeTab} />
            </div>
            <div className="main_content">
                <TopMenu activeTab={activeTab} title="Dashboard" userName={user.name} />
                <div className='content'>
                   {activeTab === 'Dashboard' ? <Dashboard /> : 
                    activeTab === 'On-Boarding' ? <OnBoarding /> : 
                    activeTab === 'Manage Holidays' ? <ManageHolidays /> :
                    activeTab === 'Company Profile' ?(<CompanyProfile openCanvas={openCanvasFlag} />) : (<AddEmployee/>)}
                </div>
            </div>
        </div>
        {!loginUser.companyProfileStatus && <CompleteProfile setActiveTab={setActiveTab} />}
        </>
    )
}

export default Home;
