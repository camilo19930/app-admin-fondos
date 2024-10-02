export declare const authSlice: import("@reduxjs/toolkit").Slice<{
    isAuthenticated: boolean;
    user: null;
}, {
    login: (state: import("immer").WritableDraft<{
        isAuthenticated: boolean;
        user: null;
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    logout: (state: import("immer").WritableDraft<{
        isAuthenticated: boolean;
        user: null;
    }>) => void;
}, "auth", "auth", import("@reduxjs/toolkit").SliceSelectors<{
    isAuthenticated: boolean;
    user: null;
}>>;
export declare const login: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "auth/login">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">;
declare const _default: import("redux").Reducer<{
    isAuthenticated: boolean;
    user: null;
}>;
export default _default;
