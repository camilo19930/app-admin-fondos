import axiosInstance from "./axiosInstance";


const userService = {
  getAllUsers: () => axiosInstance.get('/users'),
  
  getUsersById: (id:any) => axiosInstance.get(`/users/${id}`),
  
  createUser: (userData:any) => axiosInstance.post('/users', userData),
};

export default userService;
