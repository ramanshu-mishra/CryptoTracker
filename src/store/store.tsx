import {configureStore} from "@reduxjs/toolkit";
import coinReducers from "../Slices/coinSlice"
import navbarReducer from "../Slices/navBarStates";

export const store = configureStore({
    reducer :{
        coins : coinReducers,
        navbar: navbarReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;