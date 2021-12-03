import * as React from "react"
import { useParams } from "react-router-dom"
import { resourceLimits } from "worker_threads"
import Coin from "./Coin"
import { CoinName } from '../types'

type ResultProps = {
    showCoin: boolean,
    results: CoinName[],
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

function Result({showCoin, results}:ResultProps) {
    // const { id } = useParams();
    // set variable to return value from API call 
    const handleCoinSelection = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('clicked this', e.currentTarget.id)
        // use this variable to then search and populate new page with coin information 
    }
    console.log('inside result', results)
    if(showCoin){
        if(results.length === 0){
            return(<div>No result found!!~</div>)
        }
        return(
            <div>
                {results.map((item, idx) => <div key={idx} id={item.ticker} onClick={(e) => handleCoinSelection(e)}>{item.name} ({item.ticker})!!</div>)}
            </div>
        )
    }

    else return (<div>empty</div>)
    
}

export default Result