import react from 'react';
import {CoinNews} from '../types'
import Article from './Article'

type NewsProps = {
    coinNews: CoinNews[] | undefined,
}
/**
 * News returns component that list out at most 5 recent articles
 * that mention the coin's base currency symbol
 * @param coinNews 
 * @returns 
 */
function News({coinNews}:NewsProps){
    if(coinNews?.length === 0){
        return (
            <div> 
                <div className="module-header"> Recent articles:</div>
                <div>No recent news about this coin!</div>
            </div>
        )
    }
    return(
        <div>
            <div className="module-header">Recent Articles</div>
            
            {coinNews?.map((item, idx) => <Article key={idx} articleData={item}/>)}
        </div>
    )
}

export default News