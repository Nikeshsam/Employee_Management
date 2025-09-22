import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const LeaveReport = () => {

  const [leaveReports, setLeaveReports] = useState([
    {
      id: 1,
      title: 'Absent',
      description: '',
      count: '0',
      color: '#FF383C'
    },
    {
      id: 2,
      title: 'Casual Leave Type',
      description: 'Available 9 Days',
      count: '2',
      color: '#80D3F9'
    },
    {
      id: 3,
      title: 'Compensatory off',
      description: 'Available 0 Days',
      count: '0',
      color: '#75FA4C'
    },
    {
      id: 4,
      title: 'Emergency Leave',
      description: 'Available 0 Days',
      count: '0',
      color: '#ECAE3E'
    },
    {
      id: 5,
      title: 'On Duty',
      description: 'Available 0 Days',
      count: '6',
      color: '#9E55F3'
    }
  ]
  );

  return (
    <div className="leave_report_container" style={{height: '240px' }}>
      {leaveReports.map(leaveReport => (
        <div className="leave_report_content" key={leaveReport.id}>
          <div className="leave_report_count" style={{color : leaveReport.color}}>
            <span>{leaveReport.count}</span>
          </div>
          <div className="leave_report_title">
            <h5>{leaveReport.title}</h5>
            <p>{leaveReport.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LeaveReport
