import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:5000"});


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        try {
            req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile').token)}`
        }
        catch (error) {
            console.log('Error parsing JSON:', error);
        }
    }
  
    return req;
  });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id,userId) => API.put(`/post/${id}/like`, {userId: userId});