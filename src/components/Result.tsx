import React, {Dispatch, SetStateAction, useState} from "react"
import News from './News'
import CoinData from './CoinData'
import WatchList from './WatchList'
import marketoService from '../services/marketo'
import {CoinName, CoinInfo, CoinNews, CoinDB} from '../types'


type ResultProps = {
    listID: string,
    showSearch: boolean,
    results: CoinName[],
    coinList: CoinDB[],
    setShowSearch: Dispatch<SetStateAction<boolean>>
    setCoinList: Dispatch<SetStateAction<CoinDB[]>>
}
/**
 * Result returns component that lists out max 10 search results
 * Originally wanted to have search happen onChange with drop down below
 * search bar for user to click, however free-tier API limits calls to 5/min
 * making this feature not feasible
 * @param listID
 * @param showCoin 
 * @param results
 * @param coinList
 * @param setShowSearch
 * @param setCoinList
 * @returns 
 */

function Result({listID, showSearch, results, coinList, setShowSearch, setCoinList}:ResultProps) {
    // want to set coinData to CoinInfo type 
    const [coinData, setCoinData] = useState<CoinInfo>()
    const [coinNews, setCoinNews] = useState<CoinNews[]>([])
    const [coinName, setCoinName] = useState<string>('')

    const handleCoinSelection = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, itemName:string) => {
        console.log('clicked this', e.currentTarget.id)
        setCoinName(itemName)
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
            <div id="search-results">
                <div>
                {results.map((item, idx) => <div key={idx} className="result-name" id={item.base_currency_symbol} onClick={(e) => handleCoinSelection(e, item.name)}>{item.base_currency_symbol} ({item.name})!!</div>)}
                </div>
                <div className="info-container" id="coin-watch">
                    <WatchList listID={listID} coinList={coinList} setCoinList={setCoinList} coinData={coinData} setCoinData={setCoinData} coinNews={coinNews} setCoinNews={setCoinNews} coinName={coinName} setCoinName={setCoinName} setShowSearch={setShowSearch}/>
                </div>
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
                    <CoinData listID={listID} coinData={coinData} coinName={coinName} coinList={coinList} setCoinList={setCoinList}/>
                </div>

                <div className="info-container" id="coin-watch">
                    <WatchList listID={listID} coinList={coinList} setCoinList={setCoinList} coinData={coinData} setCoinData={setCoinData} coinNews={coinNews} setCoinNews={setCoinNews} coinName={coinName} setCoinName={setCoinName} setShowSearch={setShowSearch}/>
                </div>
            </div>
        )
    }
    else return (
        <div className="info-container" id="coin-watch">
            <WatchList listID={listID} coinList={coinList} setCoinList={setCoinList} coinData={coinData} setCoinData={setCoinData} coinNews={coinNews} setCoinNews={setCoinNews} coinName={coinName} setCoinName={setCoinName} setShowSearch={setShowSearch}/>
        </div>
    )
    
}

export default Result