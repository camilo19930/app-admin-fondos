export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    fund: {
        funds: never[];
    };
    user: {
        users: never[];
    };
    auth: {
        isAuthenticated: boolean;
        user: null;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        fund: {
            funds: never[];
        };
        user: {
            users: never[];
        };
        auth: {
            isAuthenticated: boolean;
            user: null;
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
