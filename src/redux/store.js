import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "@/redux/api/users";
import { setupListeners } from '@reduxjs/toolkit/query'
import { categoriesApi } from "@/redux/api/categories";
import { operationsApi } from "@/redux/api/operatins";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [operationsApi.reducerPath]: operationsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware, categoriesApi.middleware, operationsApi.middleware),
},
)

setupListeners(store.dispatch)  