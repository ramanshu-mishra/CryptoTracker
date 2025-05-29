import { useState, useEffect } from "react";
import { coinInterface } from "../Slices/coinSlice";

export function useGetCoin(coins: string, delay: number) {
    const [data, setData] = useState<coinInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    async function fetchData() {
        setLoading(true);
        setError(null);
        let res;
        try {
            res = await fetch(`https://rest.coincap.io/v3/assets?apiKey=404c062de19d06ecb22611f16c5001fb979365911d8755a8aacb42bb3b8315b5`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError(new Error("Network error"));
            setLoading(false);
            return;
        }

        if (!res.ok) {
            setData([]);
            setError(new Error("Failed to fetch data"));
            setLoading(false);
            return;
        }
        try {
            const resData = await res.json();
            const finalData: coinInterface[] = [];

            resData.data.forEach((d: {
                id: string, name: string, symbol: string, rank: number, marketCapUsd: string,
                volumeUsd24Hr: string, priceUsd: string, changePercent24Hr: string, supply: string
            }) => {
                const mp = d.marketCapUsd.slice(0, d.marketCapUsd.indexOf("."));
                const sp = d.supply.slice(0, d.supply.indexOf("."));
                const pr = d.priceUsd.slice(0, d.priceUsd.indexOf(".") + 5);
                const vl = d.volumeUsd24Hr.slice(0, d.volumeUsd24Hr.indexOf(".") + 5);
                const change = d.changePercent24Hr.slice(0, d.changePercent24Hr.indexOf(".") + 5);

                const obj: coinInterface = {
                    id: d.id,
                    name: d.name,
                    symbol: d.symbol,
                    rank: d.rank,
                    marketCap: mp,
                    volume24h: vl,
                    price: Number(pr),
                    change24h: change,
                    supply: sp
                };
                finalData.push(obj);
            });

            setData(finalData);
            setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError(new Error("Error parsing data"));
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(); // Initial fetch
        const t = setInterval(() => {
            fetchData();
        }, delay);
        return () => {
            clearInterval(t);
        };
    }, [coins, delay]);

    return { data, loading, error };
}