import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "/categories",
            providesTags: ["Categories"],
        }),
        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: "/custom/categorie",
                method: "POST",
                body: newCategory
            }),
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: "/categories/" + id,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories"],
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: "/categories/" + category.id,
                method: "PATCH",
                body: category
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoriesApi;