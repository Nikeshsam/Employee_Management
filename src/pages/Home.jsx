import React from 'react'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Sidebar from '../components/MenuSidebar/Sidebar.jsx';
import TopMenu from '../components/MenuSidebar/TopMenu.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import OnBoarding from '../components/Dashboard/OnBoarding.jsx';

const Home = () => {
    return (
        <div className='main_container'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className="main_content">
                <TopMenu />
                <div className='content'>
                     <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/onboarding" element={<OnBoarding />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Home;
