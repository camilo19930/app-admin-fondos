import axiosInstance from "./axiosInstance";
const fundService = {
    getAllFunds: () => axiosInstance.get('/funds')
};
export default fundService;
