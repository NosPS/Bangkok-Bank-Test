import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global.slice";

export const store = configureStore({
    reducer: { globalReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;