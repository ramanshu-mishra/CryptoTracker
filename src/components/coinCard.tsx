import { coinInterface } from "../Slices/coinSlice"
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