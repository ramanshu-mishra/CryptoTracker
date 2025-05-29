import { createSlice , PayloadAction} from "@reduxjs/toolkit";
const initialState : {text: string} = {
    text: ""
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers : {
        setSearchState: (state, action: PayloadAction<{newtext: string}>)=>{
            state.text = action.payload.newtext
        },
       
    }
})


export const {setSearchState} = searchSlice.actions;
export default searchSlice.reducer;