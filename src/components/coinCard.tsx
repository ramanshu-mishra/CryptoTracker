import { coinInterface } from "../Slices/coinSlice"
export function CoinCard(props:coinInterface){
    return (
      <div className="w-[90vw] mx-auto grid grid-cols-[3%_5%_20%_10%_8%_8%_12%_12%_20%] text-xs md:text-sm font-semibold  py-3 border-b border-gray-700 ">
        <div className="text-center">★</div>
        <div className="text-center">{props.rank}</div>
        <div className="">{props.name}</div>
        <div className="text-center">{props.price}</div>
        <div className={`text-center ${(props.change24h[0] == '-')?"text-red-400":"text-green-400"}`}>{(props.change24h[0] == '-')?"":"+"}{props.change24h}</div>
        <div className="text-center">{props.marketCap}</div>
        <div className="text-center">{props.volume24h}</div>
        <div className="text-center">{props.supply}</div>
        <div className="text-center">-</div>
      </div>
    )
  }