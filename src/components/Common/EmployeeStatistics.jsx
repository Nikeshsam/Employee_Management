import React, { useState, useEffect } from "react";
import UpArrow from "../../assets/Images/up-arrow.svg";
import { getEmployees } from "../../api/index.js";
import { useLoginUser } from "../../context/LoginUserContext.jsx";
import Loader from "../Common/Loader.jsx";

function EmployeeStatistics() {
  const [employeeStats, setEmployeeStats] = useState({
    totalEmployees: 0,
    newEmployees: 0,
    resignedEmployees: 0, // Optional if you track via status
    jobApplications: 0,   // Optional if separate API
  });

  const [loading, setLoading] = useState(false);
  const { loginUser } = useLoginUser();

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        setLoading(true);

        const response = await getEmployees(
          "",
          1,
          1000, // fetch all employees (or backend can support count endpoint)
          loginUser.token
        );

        const employees = response?.data?.data || [];

        // Calculate total employees
        const total = employees.length;

        // Calculate new employees (e.g., joined in last 30 days)
        const now = new Date();
        const newEmp = employees.filter((emp) => {
          const joinDate = new Date(emp.joiningDate);
          const diffInDays = (now - joinDate) / (1000 * 60 * 60 * 24);
          return diffInDays <= 30; // joined within last 30 days
        }).length;

        // Optional: resigned employees (if your API has status field)
        const resigned = employees.filter(
          (emp) => emp.status?.toLowerCase() === "resigned"
        ).length;

        setEmployeeStats({
          totalEmployees: total,
          newEmployees: newEmp,
          resignedEmployees: resigned,
          jobApplications: 385, // placeholder or fetch from another API
        });
      } catch (error) {
        console.error("Failed to fetch employee stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loginUser?.token) fetchEmployeeStats();
  }, [loginUser]);

  const stats = [
    {
      title: "Total Employees",
      count: employeeStats.totalEmployees,
      percentage: employeeStats.totalEmployees > 0 ? 100 : 0,
    },
    {
      title: "New Employees (30 days)",
      count: employeeStats.newEmployees,
      percentage:
        employeeStats.totalEmployees > 0
          ? Math.round(
              (employeeStats.newEmployees / employeeStats.totalEmployees) * 100
            )
          : 0,
    },
    {
      title: "Resigned Employees",
      count: employeeStats.resignedEmployees,
      percentage:
        employeeStats.totalEmployees > 0
          ? Math.round(
              (employeeStats.resignedEmployees /
                employeeStats.totalEmployees) *
                100
            )
          : 0,
    },
    {
      title: "Job Applications",
      count: employeeStats.jobApplications,
      percentage: 33, // static or fetched separately
    },
  ];

  return (
    <div className="employeestate_container g-3 row">
      {stats.map((data, index) => (
        <div className="col-3" key={index}>
          <div className="employee_content">
            <h5>{data.title}</h5>
            <div className="employee_count">
              <span className="count">{data.count}</span>
              <span className="count-text">People</span>
              <span className="count-percentage">
                <i>
                  <img src={UpArrow} alt="" />
                </i>
                {data.percentage}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeStatistics;
