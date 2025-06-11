import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../components/MenuSidebar/Sidebar.jsx';
import TopMenu from '../components/MenuSidebar/TopMenu.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';

const Home = () => {
    return (
        <div className='main_container'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className="main_content">
                <TopMenu />
                <div className='content'>
                    <Dashboard />
                </div>
            </div>
        </div>
    )
}

export default Home;
