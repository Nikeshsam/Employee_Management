import axios from 'axios';

const url = 'http://localhost:3005/api/v1';

export const registerCompany = (companyDetails) => axios.post(`${url}/authentication/register`, companyDetails);
export const userLogin = (authDetails) => axios.post(`${url}/authentication/login`, authDetails)
export const validateUser = (token) => axios.get(`${url}/authentication/validate`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const organizationDetails = (organization, token) => axios.post(`${url}/organization`, organization, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const getOrganizationDetails = (token) => axios.get(`${url}/organization`,  {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// export const updatePost = (id,post)=> axios.patch(`${url}/${id}`,post);
// export const likePost = (id)=> axios.patch(`${url}/${id}`);
// export const deletePost = (id)=> axios.patch(`${url}/${id}`);