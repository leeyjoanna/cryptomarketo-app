import react from 'react';
import {CoinNews} from '../types'

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
            <div> No recent news about this coin!</div>
        )
    }
    return(
        <div>
            {coinNews?.map((item, idx) => <div key={idx}>{item.title} by {item.author} <a href={item.article_url}>Click here!</a></div>)}
        </div>
    )
}

export default News