import React, {Dispatch, SetStateAction, useState} from "react"
import News from './News'
import CoinData from './CoinData'
import WatchList from './WatchList'
import marketoService from '../services/marketo'
import {CoinName, CoinInfo, CoinNews} from '../types'


type ResultProps = {
    showSearch: boolean,
    results: CoinName[],
    setShowSearch: Dispatch<SetStateAction<boolean>>
}
/**
 * Result returns component that lists out max 10 search results
 * Originally wanted to have search happen onChange with drop down below
 * search bar for user to click, however free-tier API limits calls to 5/min
 * making this feature not feasible
 * @param showCoin 
 * @param results
 * @returns 
 */

function Result({showSearch, results, setShowSearch}:ResultProps) {
    // want to set coinData to CoinInfo type 
    const [coinData, setCoinData] = useState<CoinInfo>()
    const [coinNews, setCoinNews] = useState<CoinNews[]>()

    const handleCoinSelection = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('clicked this', e.currentTarget.id)
        marketoService
        .getCoin(e.currentTarget.id)
        .then(response => {
            console.log('coin search', response);
            setShowSearch(false);
            setCoinData(response);
        })
        marketoService
        .getCoinNews(e.currentTarget.id)
        .then(response => {
            console.log('coin news', response);
            setCoinNews(response)
        })

    }
    console.log('inside result', results)
    if(showSearch){
        if(results.length === 0){
            return(<div id="no-result-msg">No result found matching your search term.</div>)
        }
        return(
            <div>
                {results.map((item, idx) => <div key={idx} className="result-name" id={item.base_currency_symbol} onClick={(e) => handleCoinSelection(e)}>{item.base_currency_symbol} ({item.name})!!</div>)}
            </div>
        )
    }
    if (coinData){
        return(
            <div id="coin-info-container">

                <div className="info-container" id="coin-news">
                    <News coinNews={coinNews}/>
                </div>

                <div className="info-container" id="coin-data">
                    <CoinData coinData={coinData}/>
                </div>

                <div className="info-container" id="coin-list">
                    <WatchList/>
                </div>
            </div>
        )
    }
    else return (
        <div></div>
    )
    
}

export default Result