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
            id: 1,
            Title: 'Free Plan',
            Price: '$0',
            Description: 'Ideal for individual and small teams getting started with HR management',
            Features: [
                { key: 1, Description: 'Basic task organization and tracking features' },
                { key: 2, Description: 'Single user access for personal use' },
                { key: 3, Description: 'Limited cloud storage for task-related data' },
                { key: 4, Description: 'Limited collaboration option' },
            ],
            buttonStyle: 'primary_btn_rounded',
            Icon: Images.PriceArrow,
        },
        {
            id: 2,
            Title: 'Premium',
            Price: '$200',
            Description: 'Design for growing company looking for comprehensive HR Management',
            Features: [
                { key: 1, Description: 'Advanced task organization and tracking features' },
                { key: 2, Description: 'Multi-user access for personal use' },
                { key: 3, Description: 'Expanded cloud storage for task-related data and files' },
                { key: 4, Description: 'Real time collaboration, comments, and shared data individual' },
                { key: 5, Description: 'Customizable reminders and notification for deadline' },
            ],
            buttonStyle: 'primary_btn_rounded',
            Icon: Images.PriceArrowWhite,
        },
        {
            id: 3,
            Title: 'Enterprise',
            Price: 'Custom',
            Description: 'Best solution for larger companies and organizations with complex HR needs',
            Features: [
                { key: 1, Description: 'Advanced HR analytic and productivity insights for data-driven decision' },
                { key: 2, Description: '24/7 priority customer support and dedicated customer success manager' },
                { key: 3, Description: 'Robust security and compliance measures to protect sensitive HR data' },
            ],
            buttonStyle: 'primary_btn_rounded',
            Icon: Images.PriceArrow,
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
            <Row className="align-items-center">
                {PricingTable.map((PricingTables) => (
                    <Col md={4} lg={4} xl={4} xxl={4} key={PricingTables.id}>
                        <div className="PricingTable mt-5">
                            <h6>{PricingTables.Title}</h6>
                            <span>{PricingTables.Price}</span>
                            <p>{PricingTables.Description}</p>
                            <ul>
                                {PricingTables.Features.map((Feature, i) => (
                                    <li key={Feature.key}>
                                        <i><Image src={Images.PriceCheck} /></i>
                                        <span>{Feature.Description}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`btn btn-icon ${PricingTables.buttonStyle}`}>
                                Get started
                                {/* <i><Image src={PricingTables.Icon} /></i> */}
                                <div class="btn-hvr-setting-violet">
                                    <ul class="btn-hvr-setting-inner-violet">
                                        <li class="btn-hvr-effect-violet"></li>
                                        <li class="btn-hvr-effect-violet"></li>
                                        <li class="btn-hvr-effect-violet"></li>
                                        <li class="btn-hvr-effect-violet"></li>
                                    </ul>
                                </div>
                            </button>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Pricing