import { useState, useEffect } from "react";
import { coinInterface } from "../Slices/coinSlice";

export function useGetCoin(coins:string,delay: number){
    console.log(coins);
    const [data, setData] = useState<(coinInterface)[]>([]);

    async function fetchData(){
        const res =await  fetch(`https://rest.coincap.io/v3/assets?apiKey=63afd2f72f736fa9ebaa13d2e6729010f48ee04cbf7619527e3aa3ddc5c5ceb9`);
        if(!res.ok){
            setData([]);
            return;
        }
        const resData = await res.json();
        const finalData: (coinInterface[])= [];
        
        resData.data.forEach((d: {id:string, name:string,symbol:string,rank:number,marketCapUsd:string,
            volumeUsd24Hr:string, priceUsd:string,changePercent24Hr:string,supply:string
        })=>{
            const mp = d.marketCapUsd.slice(0, d.marketCapUsd.indexOf("."));
            const sp = d.supply.slice(0, d.supply.indexOf("."));
            const pr = d.priceUsd.slice(0, d.priceUsd.indexOf(".")+5);
            const vl = d.volumeUsd24Hr.slice(0, d.volumeUsd24Hr.indexOf(".")+5);
            const change = d.changePercent24Hr.slice(0, d.changePercent24Hr.indexOf(".")+5);
            
            const obj: coinInterface = {
                id: d.id,
                name: d.name,
                symbol: d.symbol,
                rank: d.rank,
                marketCap: mp,
                volume24h: vl,
                price:  Number(pr),
                change24h: change,
                supply: sp
            };
            finalData.push(obj);
        })
        
        setData(finalData);
        console.log(finalData);
        return;
    }
    useEffect(()=>{
        const t = setInterval(()=>{
            fetchData();
        }, delay)
        return ()=>{
            clearInterval(t);
        }
    })
    return data;
}