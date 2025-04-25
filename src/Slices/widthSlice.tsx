import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    width: window.innerWidth
}

const WidthSlice = createSlice({
    name: "widthSlice",
    initialState,
    reducers: {
        setWidth: (state, action: PayloadAction<{wt: number}>)=>{
            state.width = action.payload.wt
        }
    }
})

export const {setWidth} =  WidthSlice.actions;
export default WidthSlice.reducer;
