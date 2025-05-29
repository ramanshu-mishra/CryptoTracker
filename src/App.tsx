import React, { useEffect, useRef, useState } from "react";
import { coinInterface } from "./Slices/coinSlice";
import { useGetCoin } from "./hooks/getCoinHook";
import { useDispatch, useSelector } from "react-redux";
import { setCoinsState, setOrder } from "./Slices/coinSlice";
import { changeVar, navInterface } from "./Slices/navBarStates";
import { RootState } from "./store/store";
import { setWidth } from "./Slices/widthSlice";
import { CoinCard } from "./components/coinCard";
import { Layout } from "./components/Layout";
import { SearchBar } from "./components/searchBar";



export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Layout>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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

// --- Navbar now accepts searchTerm and setSearchTerm ---
function Navbar({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (val: string) => void }) {
  const dispatch = useDispatch();
  const { data: cns, loading, error } = useGetCoin("bitcoin,ethereum,tether,xrp,bnb,solana", 2000);   
  useEffect(() => {
    dispatch(setCoinsState({ newCoins: cns }));
  }, [cns, dispatch]);

  const c = useSelector((state: RootState) => state.coins);
  const navbarVars = useSelector((state: RootState) => state.navbar);
  let coin = filteredCoins(c);

  // Filter coins by search term
  if (searchTerm.trim() !== "") {
    coin = coin.filter(
      (cn) =>
        cn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cn.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

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

  function handleMobileFilter(e: "r"|"p"|"h"|"m"|"v"|"s"){
    const keys = {
      "r": "rank",
      "p": "price",
      "h": "volume24h",
      "m": "marketCap",
      "v": "volume24h",
      "s": "supply"
    }
    handleSort(e, navbarVars[keys[e] as keyof navInterface]);
  }
  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (!loading) {
      isFirstLoad.current = false;
    }
  }, [loading]);
  
   if (loading && isFirstLoad.current) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <div className="text-gray-700">Loading coins...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600">
        <div className="mb-2">Failed to load data.</div>
        <div className="text-xs">{error.message || String(error)}</div>
      </div>
    );
  }
  return (
    <div className="w-full ">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
      {
        isMobile && <select className="bg-gray-500" onChange={(e)=>handleMobileFilter(e.target.value as "r"|"p"|"h"|"m"|"v"|"s")}>
            <option value="r">sort by rank</option>
            <option value="p">sort by price</option>
            <option value="h">sort by change24h</option>
            <option value="m">sort by marketCap</option>
            <option value="v">sort by volume24h</option>
            <option value="s">sort by supply</option>
        </select>
      }

      <div className="space-y-3">
        {coin.map((coin) => (
          <CoinCard key={coin.id} {...coin} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}