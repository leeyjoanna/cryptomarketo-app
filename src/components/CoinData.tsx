import react from 'react';
import {CoinInfo} from '../types'
import { Button } from '@mui/material'

type DataProps = {
    coinData: CoinInfo | undefined,
}
/**
 * Data returns component that displays information about the coin
 * @param coinData 
 * @returns 
 */
function Data({coinData}:DataProps){
    return(
        <div>
            <div className="module-header">Coin information</div>
            <div id="data-coin-symbol">{coinData?.symbol}</div>
            <div id="data-coin-price">
                <div>Opening price today: ${coinData?.open}</div>
                <div>Closing price today: ${coinData?.close}</div>
            </div>
            <Button variant="outlined">Add to watch list</Button>
        </div>
        
    )
}

export default Data