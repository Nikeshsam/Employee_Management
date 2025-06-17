import React, { useState } from 'react';
import EventUser from '../../assets/Images/event_user.svg';

function Employee() {

  const [employeeData, setEmployeeData] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'John Doe',
      department: 'Engineering',
      position: 'Software Engineer',
      email: 'john.doe@example.com',
      status: 'Active',
      varient: 'active',
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Jane Smith',
      department: 'Marketing',
      position: 'Marketing Manager',
      email: 'jane.smith@example.com',
      status: 'Onboarding',
      varient: 'Onboarding',
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Alice Johnson',
      department: 'Design',
      position: 'UX Designer',
      email: 'alice.johnson@example.com',
      status: 'Active',
      varient: 'active',
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Bob Brown',
      department: 'Analytics',
      position: 'Data Analyst',
      email: 'bob.brown@example.com',
      status: 'Active',
      varient: 'active',
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'Charlie White',
      department: 'Sales',
      position: 'Sales Executive',
      email: 'charlie.white@example.com',
      status: 'Onboarding ',
      varient: 'Onboarding',
    }
  ])

  return (
    <div className="employee-list">
      <table className="table table-striped primary_table">
        <thead>
          <tr>
            <th>Employee id</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Job title</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(employee => (
            <tr key={employee.id}>
              <td><a href="">{employee.employeeId}</a></td>
              <td>
                <div className='emp-name'>
                  <i><img src={EventUser} alt="" /></i>
                  {employee.name}
                </div>
              </td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
              <td><div className={`status ${employee.varient}`}>{employee.status}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Employee