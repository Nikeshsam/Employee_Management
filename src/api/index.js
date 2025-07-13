import axios from 'axios';

const url = 'http://localhost:3005/api/v1/authentication';

export const registerCompany = (companyDetails) => axios.post(`${url}/register`,companyDetails);
export const userLogin = (authDetails)=>axios.post(`${url}/login`,authDetails)
export const validateUser=(token)=>axios.get(`${url}/validate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
// export const createPosts = (newPost) => axios.post(url, newPost);
// export const updatePost = (id,post)=> axios.patch(`${url}/${id}`,post);
// export const likePost = (id)=> axios.patch(`${url}/${id}`);
// export const deletePost = (id)=> axios.patch(`${url}/${id}`);