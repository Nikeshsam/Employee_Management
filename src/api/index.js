import axios from 'axios';

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

export const getEmployees = (searchTerm, page = 1, limit = 10, token) => {
  return axios.get(`${url}/employee`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      searchTerm,
      page,
      limit,
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

// export const updatePost = (id,post)=> axios.patch(`${url}/${id}`,post);
// export const likePost = (id)=> axios.patch(`${url}/${id}`);
// export const deletePost = (id)=> axios.patch(`${url}/${id}`);