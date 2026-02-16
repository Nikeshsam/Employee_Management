import axios from 'axios';

//const url = 'https://hrmsapi-4tvu.onrender.com/api/v1';
const url = 'http://localhost:3005/api/v1';

export const registerCompany = (companyDetails) => axios.post(`${url}/authentication/register`, companyDetails);
export const userLogin = (authDetails) => axios.post(`${url}/authentication/login`, authDetails)
export const validateUser = (token) => axios.get(`${url}/authentication/validate`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

// ORGANIZATION

export const organizationDetails = (organization, token) => axios.post(`${url}/organization`, organization, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const getOrganizationDetails = (token) => axios.get(`${url}/organization`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// EMPLOYEE

export const addEmployee = (employee, token) => axios.post(`${url}/employee`, employee, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const getEmployee = (token) => axios.get(`${url}/employee`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getEmployees = (searchTerm = '', page = 1, limit = 10, token, filters) => {
  return axios.get(`${url}/employee`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      searchTerm,
      page,
      limit,
      position: filters?.position || '',
      department: filters?.department || '',
      status: filters?.status || '',
    },
  });
};

//get all employees grid load


// Employee Delete

export const deleteEmployee = (id, token) => {
  return axios.delete(`${url}/employee/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Employee Edit Organization

export const editOrganization = (organization, token, id) => axios.patch(`${url}/organization/${id}`, organization, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

// Employee Edit Edit

export const editEmployee = (employee, token, id) => axios.put(`${url}/employee/${id}`, employee, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

// Employee Export Employees Excel

export const exportEmployeesExcel = (token) => {
  return axios.get(`${url}/employee/export`, {
    responseType: 'blob', // tells axios to expect binary file
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Employee Export Employees Basic Details

export const createOrUpdateEmployeeBasicDetails = (basicemployeedetail, token) => {
  return axios.post(
    `${url}/employeeDetails/basic-details`, basicemployeedetail,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEmployeeBasicDetails = (token) => {
  return axios.get(
    `${url}/employeeDetails/basic-details`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateEmployeeContactDetails = (basicemployeedetail, token) => {
  return axios.post(
    `${url}/employeeDetails/contact-details`, basicemployeedetail,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEmployeeContactDetails = (token) => {
  return axios.get(
    `${url}/employeeDetails/contact-details`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateDependentDetails = (dependentsData, token) => {
  return axios.post(
    `${url}/employeeDetails/dependents`, dependentsData,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteDependentDetails = async (id, token) => {
  return await axios.delete(
    `${url}/employeeDetails/dependents/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDependentDetails = (token) => {
  return axios.get(
    `${url}/employeeDetails/dependents`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateEducationDetails = (educationDetails, token) => {
  return axios.post(
    `${url}/employeeDetails/education-details`, educationDetails,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEmployeeEducation = async (id, token) => {
  return await axios.delete(
    `${url}/employeeDetails/education-details/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEducationDetails = (token) => {
  return axios.get(
    `${url}/employeeDetails/education-details`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateEmployeeCertificationDetails = (employeeCertifications, token) => {
  return axios.post(
    `${url}/employeeDetails/certification`, employeeCertifications,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEmployeeCertification = async (id, token) => {
  return await axios.delete(
    `${url}/employeeDetails/certification/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEmployeeCertification = (token) => {
  return axios.get(
    `${url}/employeeDetails/certification`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateEmployeeExperienceDetails = (experienceDetails, token) => {
  return axios.post(
    `${url}/employeeDetails/experience`, experienceDetails,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEmployeeExperience = async (id, token) => {
  return await axios.delete(
    `${url}/employeeDetails/experience/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEmployeeExperienceDetails = (token) => {
  return axios.get(
    `${url}/employeeDetails/experience`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateEmployeeBenefits = (benefits, token) => {
  return axios.post(
    `${url}/employeeDetails/benefits`, benefits,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEmployeeBenefit = async (id, token) => {
  return await axios.delete(
    `${url}/employeeDetails/benefits/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEmployeeBenefits = (token) => {
  return axios.get(
    `${url}/employeeDetails/benefits`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateEmployeeHealthRecord = (vaccinations, token) => {
  return axios.post(
    `${url}/employeeDetails/health-record`, vaccinations,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEmployeeVaccinationRecord = async (id, token) => {
  return await axios.delete(
    `${url}/employeeDetails/health-record/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEmployeeHealthRecord = (token) => {
  return axios.get(
    `${url}/employeeDetails/health-record`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateEmployeeTravelDetails = (visaDetails, token) => {
  return axios.post(
    `${url}/employeeDetails/travel-record`, visaDetails,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEmployeeVisaDetails = async (id, token) => {
  return await axios.delete(
    `${url}/employeeDetails/travel-record/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEmployeeTravelRecord = (token) => {
  return axios.get(
    `${url}/employeeDetails/travel-record`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEmployeeId = async (token) => {
  return await axios.get(
    `${url}/employee/empId`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );
};

export const getLoggedEmployee = async (token) => {
  return await axios.get(
    `${url}/employeeDetails/logged-employee`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};

export const createOrUpdateHoliday = (holidayForm, token) => {
  return axios.post(
    `${url}/holiday`, holidayForm,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteHoliday = async (id, token) => {
  return await axios.delete(
    `${url}/holiday/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getHolidays = (token) => {
  return axios.get(
    `${url}/holiday`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrUpdateLeave = (leaveForm, token) => {
  return axios.post(
    `${url}/leaveMaster`, leaveForm,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteLeave = async (id, token) => {
  return await axios.delete(
    `${url}/leaveMaster/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getLeave = (token) => {
  return axios.get(
    `${url}/leaveMaster`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

// export const getEmployeeDetails = (token) => axios.get(`${url}/employeeDetails`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

export const getEmployeeDetails = (employeeId) => {
  const token = localStorage.getItem('token'); // or sessionStorage

  return axios.get(`/api/employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// export const updatePost = (id,post)=> axios.patch(`${url}/${id}`,post);
// export const likePost = (id)=> axios.patch(`${url}/${id}`);
// export const deletePost = (id)=> axios.patch(`${url}/${id}`);