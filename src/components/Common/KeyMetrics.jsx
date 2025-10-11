// KeyMetricsCard.jsx
import React, { useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const KeyMetricsCard = () => {
    const [activeTab, setActiveTab] = useState('turnover');
    const [dayFilter, setDayFilter] = useState('7d');

    // Labels for each dayFilter
    const labelsMap = {
        '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        '30d': Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        'All': Array.from({ length: 90 }, (_, i) => `Day ${i + 1}`)
    };

    // Assign colors for each metric
    const colorMap = {
        'Turnover Rate (%)': 'rgb(255, 99, 132)',        // red
        'Absence Rate (%)': 'rgb(54, 162, 235)',         // blue
        'Employee Satisfaction (%)': 'rgb(255, 206, 86)',// yellow
        'Training Completion Rate (%)': 'rgb(75, 192, 192)' // teal
    };

    // Generate realistic trend data
    const generateTrendData = (metric) => {
        const length = labelsMap[dayFilter].length;
        let base = 0;

        switch (metric) {
            case 'Turnover Rate (%)': base = 5; break;
            case 'Absence Rate (%)': base = 3; break;
            case 'Employee Satisfaction (%)': base = 70; break;
            case 'Training Completion Rate (%)': base = 60; break;
            default: base = 5;
        }

        const trend = Array.from({ length }, (_, i) => {
            let fluctuation = Math.random() * (metric.includes('Satisfaction') || metric.includes('Training') ? 5 : 2);
            if (metric.includes('Satisfaction') || metric.includes('Training')) {
                return Math.min(100, Math.max(50, base + i * 0.3 + fluctuation));
            } else {
                return Math.min(15, Math.max(0, base + Math.sin(i / 3) * 2 + fluctuation));
            }
        });

        return trend;
    };

    // Chart component
    const Chart = ({ label }) => {
        const data = {
            labels: labelsMap[dayFilter],
            datasets: [
                {
                    label: label,
                    data: generateTrendData(label),
                    borderColor: colorMap[label],
                    backgroundColor: colorMap[label].replace('rgb', 'rgba').replace(')', ', 0.2)'),
                    tension: 0.4
                }
            ]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        };

        return (
            <div style={{ height: '300px', width: '100%' }}>
                <Line data={data} options={options} />
            </div>
        );
    };

    return (
        <Card className='primary_card'>
            <Card.Header style={{ height: 'auto' }}>
                <div className='heading_group'>
                    <h3>Key Metrics</h3>
                    <p>Sep 04, 2024 - Oct 04, 2024</p>
                </div>
                <div className="heading_elements">
                    <ul className='day_filter'>
                        {['7d', '30d', 'All'].map(day => (
                            <li key={day}>
                                <button
                                    className={`day_filter_item ${dayFilter === day ? 'active' : ''}`}
                                    onClick={() => setDayFilter(day)}
                                >
                                    {day}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card.Header>

            <Card.Body>
                <Nav
                    className='Primary_tab'
                    variant="tabs"
                    activeKey={activeTab}
                    onSelect={setActiveTab}
                >
                    <Nav.Item><Nav.Link eventKey="turnover">Turnover Rate</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="absence">Absence Rate</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="satisfaction">Employee Satisfaction</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="training">Training Completion Rate</Nav.Link></Nav.Item>
                </Nav>

                <div className="tab_content" style={{ marginTop: '20px' }}>
                    {activeTab === 'turnover' && <Chart label="Turnover Rate (%)" />}
                    {activeTab === 'absence' && <Chart label="Absence Rate (%)" />}
                    {activeTab === 'satisfaction' && <Chart label="Employee Satisfaction (%)" />}
                    {activeTab === 'training' && <Chart label="Training Completion Rate (%)" />}
                </div>
            </Card.Body>
        </Card>
    );
};

export default KeyMetricsCard;
