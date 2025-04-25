import {configureStore} from "@reduxjs/toolkit";
import coinReducers from "../Slices/coinSlice"
import navbarReducer from "../Slices/navBarStates";
import widthReducer from "../Slices/widthSlice";

export const store = configureStore({
    reducer :{
        coins : coinReducers,
        navbar: navbarReducer,
        width: widthReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;