import { createSlice , PayloadAction} from "@reduxjs/toolkit";

interface coinInterface{
    id: string,
    symbol : string,
    name: string,
    rank: number,
    price: number,
    marketCap: string,
    volume24h: string,
    supply: string,
    change24h: string
}

const initialState : {coins: coinInterface[], order: string, displaycoins: coinInterface[]} = {
    coins: [],
    displaycoins: [],
    order: "R"
}

const coinSlice = createSlice({
    name: "coins",
    initialState,
    reducers : {
        setCoinsState: (state, action: PayloadAction<{newCoins: coinInterface[]}>)=>{
            state.coins = action.payload.newCoins
        },
        setOrder : (state, action: PayloadAction<{order:string}>)=>{
            state.order = action.payload.order
        },
        setDisplayCoins:(state, action: PayloadAction<{newCoins: coinInterface[]}>)=>{
            state.displaycoins = action.payload.newCoins
        }
    }
})

export const {setCoinsState, setOrder, setDisplayCoins} = coinSlice.actions;
export type {coinInterface}
export default coinSlice.reducer;