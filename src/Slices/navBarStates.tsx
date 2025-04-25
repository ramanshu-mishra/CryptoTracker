import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface navInterface{
rank: string,
marketCap: string,
volume24h:string,
price:string,
change24h: string,
supply: string,
active: string
}
const initialState: navInterface = {
    rank: "r",
    marketCap: "m",
    volume24h: "v",
    price: "p",
    change24h: "h",
    supply: "s",
    active: "r"
};

const navBarSlice = createSlice({
    name: "navbarSlice",
    initialState,
    reducers: {
        changeVar: (state, action:PayloadAction<{notation:string}>)=>{
            const p = action.payload.notation;
            Object.keys(state).forEach(key => {
                const typedKey = key as keyof navInterface;
                if (state[typedKey] === p) {
                    if (p >= 'a' && p <= 'z') state[typedKey] = state[typedKey].toUpperCase();
                    else state[typedKey] = state[typedKey].toLowerCase();
                }
            });
            state.active = (p>='a'&&p<='z')?p.toUpperCase():p.toLowerCase();
        }
    }
})

export const {changeVar} = navBarSlice.actions;
export default navBarSlice.reducer;
export type {navInterface}


