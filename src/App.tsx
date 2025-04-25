import React, { useEffect, useState } from "react"
import { coinInterface } from "./Slices/coinSlice";
import { useGetCoin } from "./hooks/getCoinHook";
import { useDispatch, useSelector } from "react-redux";
import { setCoinsState, setOrder } from "./Slices/coinSlice";
import { changeVar } from "./Slices/navBarStates";
import { RootState } from "./store/store";
import { CoinCard } from "./components/coinCard";
import { Layout } from "./components/Layout";

export default function App(){
 
  return (
    
        <Layout>
        <Navbar>
        </Navbar>
        </Layout>

    
  )
}



function filteredCoins(cns: { coins: coinInterface[]; order: string; }): coinInterface[] {
  const coinsCopy = [...cns.coins];
  const order = cns.order;

  if (order === 'R') return coinsCopy;
  if (order === 'r') return coinsCopy.reverse();
  if (order === 'p') return coinsCopy.sort((a, b) => Number(a.price) - Number(b.price));
  if (order === 'P') return coinsCopy.sort((a, b) => Number(b.price) - Number(a.price));
  if (order === 'h') return coinsCopy.sort((a, b) => Number(a.change24h) - Number(b.change24h));
  if (order === 'H') return coinsCopy.sort((a, b) => Number(b.change24h) - Number(a.change24h));
  if (order === 'm') return coinsCopy.sort((a, b) => Number(a.marketCap) - Number(b.marketCap));
  if (order === 'M') return coinsCopy.sort((a, b) => Number(b.marketCap) - Number(a.marketCap));
  if (order === 'v') return coinsCopy.sort((a, b) => Number(a.volume24h) - Number(b.volume24h));
  if (order === 'V') return coinsCopy.sort((a, b) => Number(b.volume24h) - Number(a.volume24h));
  if (order === 's') return coinsCopy.sort((a, b) => Number(a.supply) - Number(b.supply));
  if (order === 'S') return coinsCopy.sort((a, b) => Number(b.supply) - Number(a.supply));
  return coinsCopy;
}

  function Navbar() {
      const dispatch = useDispatch();
      const cns = useGetCoin("bitcoin,ethereum,tether,xrp,bnb,solana", 500);
      dispatch(setCoinsState({newCoins: cns}));
      const c = useSelector((state:RootState)=>state.coins)
      const navbarVars = useSelector((state:RootState)=>state.navbar);
      const coin = filteredCoins(c);
      const [wt, setWt] = useState(window.innerWidth);
      
      useEffect(() => {
        const handleResize = () => setWt(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize(); 
        return () => window.removeEventListener("resize", handleResize);
      }, []);
      
      const phone = (wt<1300);
      console.log(phone);
      
    return (
      <div>  
      { !phone &&<div className={`w-[90vw] mx-auto grid grid-cols-[3%_5%_20%_10%_8%_8%_12%_12%_20%] text-xs md:text-sm font-semibold dark:text-black text-gray-400 py-3 border-b border-gray-700 `}>
        
        <div className="text-center"></div>
        <div className={` dark:text-black active:text-yellow-500 text-center hover:cursor-pointer hover:text-blue-500 ${(navbarVars.active.toLowerCase()=='r')?"text-yellow-500":""}`} onClick={()=>{dispatch(setOrder({order: (c.order=='r')?"R":"r"}));
                                                  dispatch(changeVar({notation: navbarVars.rank}))}}>{(navbarVars.rank=='r')?"↑ ":"↓ "}#</div>
        <div className="">Name</div>  
        <div className={`active:text-yellow-500 text-center hover:cursor-pointer hover:text-blue-500 ${(navbarVars.active.toLowerCase()=='p')?"text-yellow-500":""}`} onClick={()=>{dispatch(setOrder({order: (c.order=='p')?"P":"p"}));
                                                  dispatch(changeVar({notation: navbarVars.price}))}}>{(navbarVars.price=='p')?"↑ ":"↓ "}Price</div>
         <div className={`active:text-yellow-500 text-center hover:cursor-pointer hover:text-blue-500 ${(navbarVars.active.toLowerCase()=='h')?"text-yellow-500":""}`} onClick={()=>{dispatch(setOrder({order: (c.order=='h')?"H":"h"}));
                                                  dispatch(changeVar({notation: navbarVars.change24h}))}}>{(navbarVars.change24h=='h')?"↑ ":"↓ "}24h%</div>
        <div className={`active:text-yellow-500 text-center hover:cursor-pointer hover:text-blue-500 ${(navbarVars.active.toLowerCase()=='m')?"text-yellow-500":""}`} onClick={()=>{dispatch(setOrder({order: (c.order=='m')?"M":"m"}));
                                                  dispatch(changeVar({notation: navbarVars.marketCap}))}}>{(navbarVars.marketCap=='m')?"↑ ":"↓ "}Market Cap</div>
        <div className={`active:text-yellow-500 text-center hover:cursor-pointer hover:text-blue-500 ${(navbarVars.active.toLowerCase()=='v')?"text-yellow-500":""}`} onClick={()=>{dispatch(setOrder({order: (c.order=='v')?"V":"v"}));
                                                  dispatch(changeVar({notation: navbarVars.volume24h}))}}>{(navbarVars.volume24h=='v')?"↑ ":"↓ "}Volume(24h)</div>
        <div className={`active:text-yellow-500 text-center hover:cursor-pointer hover:text-blue-500 ${(navbarVars.active.toLowerCase()=='s')?"text-yellow-500":""}`} onClick={()=>{dispatch(setOrder({order: (c.order=='s')?"S":"s"}));
                                                  dispatch(changeVar({notation: navbarVars.supply}))}}>{(navbarVars.supply=='s')?"↑ ":"↓ "}Circulating Supply</div>
        <div className="text-center" >Last 7 days</div>
      </div>}
      {!phone &&  
        coin.map(coin=>{
          if(coin )return <CoinCard id={coin.id} name={coin.name} symbol={coin.symbol} rank={coin.rank} marketCap={coin.marketCap}
          volume24h={coin.volume24h} price={coin.price} change24h={coin.change24h} supply={coin.supply}></CoinCard>
        })
      }
      </div>   
    );
  }

