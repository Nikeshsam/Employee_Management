import React, { useState } from 'react';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';
import { Key } from 'lucide-react';

// Bootstrap imports


const Pricing = () => {
    const [PricingTable, setPricingTable] = useState([
        {
            Key: '1',
            Title: 'Free Plan',
            Price: '$0',
            Description: 'Ideal for individual and small teams getting started with HR management',
            Features: [
                'Basic task organization and tracking features',
                'Single user access for personal use',
                'Limited cloud storage for task-related data',
                'Limited collaboration option',
            ],
            buttonStyle: 'btn-primary text-white',
        },
        {
            Key: '2',
            Title: 'Premium',
            Price: '$200',
            Description: 'Design for growing company looking for comprehensive HR Management',
            Features: [
                'Advanced task organization and tracking features',
                'Multi-user access for personal use',
                'Expanded cloud storage for task-related data and files',
                'Real time collaboration, comments, and shared data individual',
                'Customizable reminders and notification for deadline',
            ],
            buttonStyle: 'btn-primary text-white',
        },
        {
            Key: '3',
            Title: 'Enterprise',
            Price: 'Custom',
            Description: 'Best solution for larger companies and organizations with complex HR needs',
            Features: [
                'Advanced HR analytic and productivity insights for data-driven decision',
                '24/7 priority customer support and dedicated customer success manager',
                'Robust security and compliance measures to protect sensitive HR data',
            ],
            buttonStyle: 'btn-primary text-white',
        }
    ])
    return (
        <>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <div className='Banner_container align-items-center pe-5 ps-5'>
                    <span style={{ lineHeight: '20px' }}>Pricing</span>
                    <h2 style={{ lineHeight: '42px' }}>Flexible Plants & Friendly Budget</h2>
                </div>
            </Col>
            <Row>
                {PricingTable.map((PricingTables) => (
                    <Col md={4} lg={4} xl={4} xxl={4}>
                        <div className="PricingTable mt-5">
                            <h6>{PricingTables.Title}</h6>
                            <span>{PricingTables.Price}</span>
                            <p>{PricingTables.Description}</p>
                            <ul>
                                {PricingTables.Features.map((Features, i) => (
                                    <li key={1}>
                                        {Features}
                                    </li>
                                ))}
                            </ul>
                            <button className={`btn w-100 ${PricingTables.buttonStyle}`}>
                                Get started →
                            </button>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Pricing