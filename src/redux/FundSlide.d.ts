export declare const fundSlice: import("@reduxjs/toolkit").Slice<{
    funds: never[];
}, {
    getFund: (state: import("immer").WritableDraft<{
        funds: never[];
    }>, action: {
        payload: any;
        type: string;
    }) => void;
}, "fund", "fund", import("@reduxjs/toolkit").SliceSelectors<{
    funds: never[];
}>>;
export declare const getFund: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "fund/getFund">;
declare const _default: import("redux").Reducer<{
    funds: never[];
}>;
export default _default;
