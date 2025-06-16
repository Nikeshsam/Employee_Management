import React, { useState } from 'react';

function Employee() {

  const [employeeData, setEmployeeData] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      position: 'Software Engineer', 
      department: 'Development' 
    },
    { id: 2,
      name: 'Jane Smith', 
      position: 'Project Manager', 
      department: 'Management'
    },
    { id: 3, 
      name: 'Alice Johnson', 
      position: 'UX Designer', 
      department: 'Design' 
    },
    { id: 4, 
      name: 'Bob Brown', 
      position: 'Data Analyst', 
      department: 'Analytics' 
    }
  ])

  return (
    <div className="employee-list">
      <ul>
        {employeeData.map(employee => (
          <li key={employee.id}>
            <h3>{employee.name}</h3>
            <p>Position: {employee.position}</p>
            <p>Department: {employee.department}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Employee