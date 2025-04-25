import React, { useEffect, useState } from "react";
import { coinInterface } from "./Slices/coinSlice";
import { useGetCoin } from "./hooks/getCoinHook";
import { useDispatch, useSelector } from "react-redux";
import { setCoinsState, setOrder } from "./Slices/coinSlice";
import { changeVar } from "./Slices/navBarStates";
import { RootState } from "./store/store";
import { setWidth } from "./Slices/widthSlice";
import { navInterface } from "./Slices/navBarStates";

export default function App() {
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
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

function tabletModeCoins(coins: coinInterface[]) {
  return coins.map((coin) => ({
    ...coin,
    marketCap: ((Number(coin.marketCap) / 1_000_000).toFixed(2)).toString() + "M",
    volume24h: ((Number(coin.volume24h) / 1_000_000).toFixed(2)).toString() + "M",
    supply: ((Number(coin.supply) / 1_000).toFixed(2)).toString() + "K",
  }));
}


function Navbar() {
  const dispatch = useDispatch();
  const cns = useGetCoin("bitcoin,ethereum,tether,xrp,bnb,solana", 500);
  dispatch(setCoinsState({ newCoins: cns }));

  const c = useSelector((state: RootState) => state.coins);
  const navbarVars = useSelector((state: RootState) => state.navbar);
  let coin = filteredCoins(c);


  useEffect(() => {
    const handleResize = () => dispatch(setWidth({wt: window.innerWidth}));
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const wt = useSelector((store: RootState)=>store.width.width);
  
  const isMobile = wt < 1000;
  const tablet= wt>=1000 && wt<= 1365;
  if(tablet){
    coin = tabletModeCoins(coin);
  }
  
  const handleSort = (type: string, activeVar: string) => {
    dispatch(setOrder({ order: c.order === type ? type.toUpperCase() : type }));
    dispatch(changeVar({ notation: activeVar }));
  };
  

  return (
    <div className="w-full ">
      {!isMobile && (
        <div className="w-[90vw] mx-auto grid grid-cols-[3%_5%_20%_10%_8%_8%_12%_12%_20%] text-xs md:text-sm font-semibold text-gray-400 dark:text-black py-3 border-b border-gray-700 ">
          <div className="text-center"></div>
          <div className={`text-center hover:cursor-pointer hover:text-blue-500 ${navbarVars.active.toLowerCase() === "r" ? "text-yellow-500" : ""}`} onClick={() => handleSort("r", navbarVars.rank)}>{navbarVars.rank === "r" ? "↑ " : "↓ "}#</div>
          <div>Name</div>
          <div className={`text-center hover:cursor-pointer hover:text-blue-500 ${navbarVars.active.toLowerCase() === "p" ? "text-yellow-500" : ""}`} onClick={() => handleSort("p", navbarVars.price)}>{navbarVars.price === "p" ? "↑ " : "↓ "}Price</div>
          <div className={`text-center hover:cursor-pointer hover:text-blue-500 ${navbarVars.active.toLowerCase() === "h" ? "text-yellow-500" : ""}`} onClick={() => handleSort("h", navbarVars.change24h)}>{navbarVars.change24h === "h" ? "↑ " : "↓ "}24h%</div>
          <div className={`text-center hover:cursor-pointer hover:text-blue-500 ${navbarVars.active.toLowerCase() === "m" ? "text-yellow-500" : ""}`} onClick={() => handleSort("m", navbarVars.marketCap)}>{navbarVars.marketCap === "m" ? "↑ " : "↓ "}Market Cap</div>
          <div className={`text-center hover:cursor-pointer hover:text-blue-500 ${navbarVars.active.toLowerCase() === "v" ? "text-yellow-500" : ""}`} onClick={() => handleSort("v", navbarVars.volume24h)}>{navbarVars.volume24h === "v" ? "↑ " : "↓ "}Volume</div>
          <div className={`text-center hover:cursor-pointer hover:text-blue-500 ${navbarVars.active.toLowerCase() === "s" ? "text-yellow-500" : ""}`} onClick={() => handleSort("s", navbarVars.supply)}>{navbarVars.supply === "s" ? "↑ " : "↓ "}Supply</div>
          <div className="text-center">7D</div>
        </div>
      )}

      <div className="space-y-3">
        {coin.map((coin) => (
          <CoinCard key={coin.id} {...coin} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

export function CoinCard(props: coinInterface & { isMobile?: boolean }) {
  return (
    <div className={`w-[90vw] mx-auto ${props.isMobile ? "bg-gray-800 p-4 rounded-lg space-y-1" : "grid grid-cols-[3%_5%_20%_10%_8%_8%_12%_12%_20%]"} text-xs md:text-sm font-semibold border-b border-gray-700`}>
      {props.isMobile ? (
        <>
          <div className="text-base font-bold text-white">{props.name} ({props.symbol.toUpperCase()})</div>
          <div className="flex justify-between"><span>Rank:</span> <span>{props.rank}</span></div>
          <div className="flex justify-between"><span>Price:</span> <span>${props.price}</span></div>
          <div className="flex justify-between"><span>24h Change:</span> <span className={`${props.change24h[0] === '-' ? 'text-red-400' : 'text-green-400'}`}>{props.change24h[0] === '-' ? '' : '+'}{props.change24h}%</span></div>
          <div className="flex justify-between"><span>Market Cap:</span> <span>${props.marketCap}</span></div>
          <div className="flex justify-between"><span>Volume:</span> <span>${props.volume24h}</span></div>
          <div className="flex justify-between"><span>Supply:</span> <span>{props.supply}</span></div>
          <div className="text-center text-gray-400">7D Chart: —</div>
        </>
      ) : (
        <>
          <div className="text-center">★</div>
          <div className="text-center">{props.rank}</div>
          <div>{props.name}</div>
          <div className="text-center">{props.price}</div>
          <div className={`text-center ${props.change24h[0] === '-' ? 'text-red-400' : 'text-green-400'}`}>{props.change24h[0] === '-' ? '' : '+'}{props.change24h}</div>
          <div className="text-center">{props.marketCap}</div>
          <div className="text-center">{props.volume24h}</div>
          <div className="text-center">{props.supply}</div>
          <div className="text-center">-</div>
        </>
      )}
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white">
      <header className="sticky top-0 z-10 bg-gray-800 shadow-md py-4 px-6 text-center text-xl sm:text-2xl font-bold tracking-wide">
        💹 RAMANSHU MISHRA • CRYPTO TRACKER
      </header>

      <main className="flex-1 overflow-y-auto px-2 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          {children}
        </div>
      </main>

      <footer className="bg-gray-800 py-3 text-xs sm:text-sm text-gray-400 text-center">
        Built with ❤️ by Ramanshu
      </footer>
    </div>
  );
}
