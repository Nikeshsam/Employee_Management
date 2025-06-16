import React, { useState } from 'react';
import UpArrow from '../../assets/Images/up-arrow.svg';

function EmployeeStatistics() {

    // Sample data for employee statistics
    // This can be replaced with actual data fetched from an API or database
    
    const [employeeData, setEmployeeData] = useState([
        { title: 'Total Employee', count: 225, percentage: 20 },
        { title: 'New Employee', count: 45, percentage: 11 },
        { title: 'Resigned Employee', count: 12, percentage: 5 },
        { title: 'Job Applications', count: 385, percentage: 33 }
    ]);
    return (
        <div className='employeestate_container'>
            {employeeData.map((data, index) => (
                <div className='employee_content' key={index}>
                    <h5>{data.title}</h5>
                    <div className='employee_count'>
                        <span className='count'>
                            {data.count}
                        </span>
                        <span className='count-text'>People</span>
                        <span className='count-percentage'>
                            <i><img src={UpArrow} alt="" /></i>
                            {data.percentage}%
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EmployeeStatistics