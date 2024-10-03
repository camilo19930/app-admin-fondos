import axiosInstance from "./axiosInstance";
const userService = {
    getAllUsers: () => axiosInstance.get('/users'),
    getUsersById: (id) => axiosInstance.get(`/users/${id}`),
    createUser: (userData) => axiosInstance.post('/users', userData),
};
export default userService;
