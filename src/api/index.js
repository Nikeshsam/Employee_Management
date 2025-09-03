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

export const getOrganizationDetails = (token) => axios.get(`${url}/organization`,  {
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

export const getEmployee = (token) => axios.get(`${url}/employee`,  {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getEmployees = (searchTerm='', page = 1, limit = 10, token, filters) => {
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



// export const updatePost = (id,post)=> axios.patch(`${url}/${id}`,post);
// export const likePost = (id)=> axios.patch(`${url}/${id}`);
// export const deletePost = (id)=> axios.patch(`${url}/${id}`);