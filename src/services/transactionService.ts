import axiosInstance from "./axiosInstance";


const transactionService = {
  subscritionFund: (id:any, data: any) => axiosInstance.put(`/transaction/fondo_actual/${id}`, data),
  
  cancelFund: (id:any, data: any) => axiosInstance.put(`/transaction/cancelar_fondo/${id}`, data)
};

export default transactionService;
