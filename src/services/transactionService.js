import axiosInstance from "./axiosInstance";
const transactionService = {
    subscritionFund: (id, data) => axiosInstance.put(`/transaction/fondo_actual/${id}`, data),
    cancelFund: (id, data) => axiosInstance.put(`/transaction/cancelar_fondo/${id}`, data)
};
export default transactionService;
