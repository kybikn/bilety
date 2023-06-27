import { cartReducer } from "./feature/cart";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { movieApi } from "./services/movieApi";
import { cinemaApi } from "./services/cinemaApi";
import { reviewApi } from "./services/reviewApi";
import { filterReducer } from "./feature/filter";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filter: filterReducer,
        [movieApi.reducerPath]: movieApi.reducer,
        [cinemaApi.reducerPath]: cinemaApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([cinemaApi.middleware, movieApi.middleware, reviewApi.middleware]),
    devTools: process.env.NODE_ENV !== "production"
});
