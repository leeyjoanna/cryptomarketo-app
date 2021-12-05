import React, {Dispatch, SetStateAction} from 'react';
import {CoinDB} from '../types'

type WatchListProps = {
    listID: string,
    coinList: CoinDB[],
    setCoinList: Dispatch<SetStateAction<CoinDB[]>>
}
/**
 * WatchList returns component with user's saved coins
 * Data is dated and old until user elects to refresh the list
 * 
 * @param listID
 * @param coinList 
 * @param setCoinList
 * @returns 
 */

function WatchList({listID, coinList, setCoinList}:WatchListProps){
    console.log('watchlist-coinlist', coinList)
    return(
        <div>
            <div className="module-header">My Watch List</div>
            <div>
                {coinList?.map((coinItem, idx) => (
                    <div className="watchlist-coin-container" key={idx}> 
                        <div className="watchlist-coin-name"><b>{coinItem.ticker}: </b>{coinItem.name} </div>
                        <div className="watchlist-coin-price">${coinItem.last_price} as of {coinItem.date}</div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WatchList