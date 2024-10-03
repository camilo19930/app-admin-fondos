declare const fundService: {
    getAllFunds: () => Axios.IPromise<Axios.AxiosXHR<unknown>>;
};
export default fundService;
