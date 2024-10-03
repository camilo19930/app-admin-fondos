declare const transactionService: {
    subscritionFund: (id: any, data: any) => Axios.IPromise<Axios.AxiosXHR<unknown>>;
    cancelFund: (id: any, data: any) => Axios.IPromise<Axios.AxiosXHR<unknown>>;
};
export default transactionService;
