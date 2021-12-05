import React, {Dispatch, SetStateAction} from 'react';
import marketoService from '../services/marketo'
import {CoinInfo, CoinDB} from '../types'
import { Button } from '@mui/material'

type DataProps = {
    listID: string,
    coinData: CoinInfo | undefined,
    coinName: string | undefined,
    coinList: CoinDB[],
    setCoinList: Dispatch<SetStateAction<CoinDB[]>>
}
/**
 * Data returns component that displays information about the coin
 * @param listID
 * @param coinData 
 * @param coinName
 * @param coinList
 * @param setCoinList
 * @returns 
 */
function CoinData({listID, coinData, coinName, coinList, setCoinList}:DataProps){
    const doesExistInList = () => {
        let isInList = false;
        coinList?.forEach((coin)=> {
            if(coin.ticker === coinData?.symbol){
                isInList= true
            }
        })
        return isInList;
    }

    const handleAddWatchList = () => {
        if(doesExistInList()){
            alert(`oops, that's in your list already!`)
            return false;
        }
        if(coinData!==undefined && coinName!==undefined){
            let newListItem:CoinDB = {
                name: coinName,
                ticker: coinData?.symbol,
                date: coinData?.day,
                last_price: coinData?.close
            }
            marketoService
                .updateList(coinList.concat(newListItem), listID)
                .then(response => {
                    setCoinList(coinList.concat(newListItem));
                })
                .catch(e => console.log(e))

        }
        return false;
    }
    return(
        <div>
            <div className="module-header">Coin information</div>
            <div id="data-coin-symbol">{coinData?.symbol}</div>
            <div id="data-coin-name">{coinName}</div>
            <div id="data-coin-price">
                <div>Opening price today: ${coinData?.open}</div>
                <div>Closing price today: ${coinData?.close}</div>
            </div>
            <Button variant="outlined" onClick={handleAddWatchList}>Add to watch list</Button>
        </div>
        
    )
}

export default CoinData