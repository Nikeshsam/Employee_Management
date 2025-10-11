import React, { useEffect, useState } from "react";
import EventUser from "../../assets/Images/event_user.svg";
import { getEmployees } from "../../api/index.js";
import { useLoginUser } from "../../context/LoginUserContext.jsx";
import Loader from "../Common/Loader.jsx";

function Employee() {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useLoginUser();

  useEffect(() => {
    const fetchRecentEmployees = async () => {
      try {
        setLoading(true);
        const response = await getEmployees(
          "",       // empty search
          1,        // page number 1
          5,        // only latest 5 records
          loginUser.token
        );

        const allEmployees = response?.data?.data || [];

        // Sort by joining date descending (latest first)
        const sortedEmployees = [...allEmployees].sort(
          (a, b) => new Date(b.joiningDate) - new Date(a.joiningDate)
        );

        // Keep only top 5
        setEmployeeData(sortedEmployees.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch recent employees:", error);
        setEmployeeData([]);
      } finally {
        setLoading(false);
      }
    };

    if (loginUser?.token) fetchRecentEmployees();
  }, [loginUser]);

  return (
    <div className="employee-list">
      {/* <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Recent Employees</h5>
        <a href="/employees" className="text-primary fs-14 fw-500">
          View All
        </a>
      </div> */}

      <table className="table table-striped primary_table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Job Title</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.length > 0 ? (
            employeeData.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <a href="#">{employee.employeeId}</a>
                </td>
                <td>
                  <div className="emp-name d-flex align-items-center gap-2">
                    <i>
                      <img src={EventUser} alt="" />
                    </i>
                    {employee.firstName} {employee.lastName}
                  </div>
                </td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.email}</td>
                <td>
                  <div className={`status ${employee.status?.toLowerCase()}`}>
                    {employee.status || "Active"}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-3 text-muted">
                No recent employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
