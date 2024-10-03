declare const userService: {
    getAllUsers: () => Axios.IPromise<Axios.AxiosXHR<unknown>>;
    getUsersById: (id: any) => Axios.IPromise<Axios.AxiosXHR<unknown>>;
    createUser: (userData: any) => Axios.IPromise<Axios.AxiosXHR<unknown>>;
};
export default userService;
