import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const operationsApi = createApi({
    reducerPath: "operationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }),
    endpoints: (builder) => ({
        getoperations: builder.query({
            query: () => "/operations",
            providesTags: ["Operations"],
        }),
        addOperation: builder.mutation({
            query: (newOperation) => ({
                url: "/new/operation",
                method: "POST",
                body: newOperation,
            }),
            invalidatesTags: ["Operations"],
        }),
        deleteOperation: builder.mutation({
            query: (id) => ({
                url: "/operations/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Operations"],
        }),
        updateOperation: builder.mutation({
            query: (Operation) => ({
                url: "/operations/" + Operation.id,
                method: "PATCH",
                body: Operation,
            }),
            invalidatesTags: ["Operations"],
        }),
    })
});

export const { useGetoperationsQuery, useAddOperationMutation, useDeleteOperationMutation, useUpdateOperationMutation } = operationsApi;