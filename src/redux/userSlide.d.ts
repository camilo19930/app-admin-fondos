export declare const userSlice: import("@reduxjs/toolkit").Slice<{
    users: never[];
}, {
    getUser: (state: import("immer").WritableDraft<{
        users: never[];
    }>, action: {
        payload: any;
        type: string;
    }) => void;
}, "user", "user", import("@reduxjs/toolkit").SliceSelectors<{
    users: never[];
}>>;
export declare const getUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/getUser">;
declare const _default: import("redux").Reducer<{
    users: never[];
}>;
export default _default;
