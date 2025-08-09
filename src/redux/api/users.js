import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            providesTags: ['Users'],
        }),
        addUser: builder.mutation({
            query: (newTodo) => ({
                url: '/users',
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: "/users/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: "/users/" + user.id,
                method: "PATCH",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
        getUserCategories: builder.query({
            query: () => `/user/categories`,
            providesTags: ['Users'],
        }),
        getUserOperations: builder.query({
            query: () => `/user/opertaions`,
            providesTags: ['Users', 'Operations'],
        }),
        getUserExpenses: builder.query({
            query: () => '/expenses/last-month',
            providesTags: ['Users']
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: '/update-password',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
    })
})

export const { useUpdatePasswordMutation, useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation, useGetUserCategoriesQuery, useGetUserOperationsQuery, useGetUserExpensesQuery } = usersApi