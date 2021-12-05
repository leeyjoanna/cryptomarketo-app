import React from 'react'
import {CoinNews} from '../types'

type ArticleProps = {
    articleData: CoinNews;
}
/**
 * Data returns component that displays information about the coin
 * @param articleData
 * @returns 
 */

function Article({articleData}:ArticleProps){
    return(
        <div className="article-container">
            <div><a href={articleData.article_url}>{articleData.title}</a></div>
            <div>by: {articleData.author}</div>
            <span className="article-divider">-------</span>
        </div>
    )
}

export default Article