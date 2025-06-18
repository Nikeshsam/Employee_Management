import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

import Sidebar from '../components/MenuSidebar/Sidebar.jsx';
import TopMenu from '../components/MenuSidebar/TopMenu.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import OnBoarding from '../components/Dashboard/OnBoarding.jsx';

const Home = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const handleSidebarClick = (val) => {
        setActiveTab(val);
    }
    return (
        <div className='main_container'>
            <div className='sidebar'>
                <Sidebar handleSidebarClick={(val)=>handleSidebarClick(val)} activeTab={activeTab} />
            </div>
            <div className="main_content">
                <TopMenu />
                <div className='content'>
                   {activeTab === 'dashboard' ? <Dashboard /> : <OnBoarding />}
                </div>
            </div>
        </div>
    )
}

export default Home;
