export interface PolygonData{
    ticker: string;
    name: string;
    market: string;
    locale: string;
    active: bool;
    currency_symbol: string;
    currency_name: string;
    base_currency_symbol: string;
    base_currency_name: string;
    last_updated_utc: string;
}

export interface CoinName{
    ticker: string;
    name: string;
    base_currency_symbol: string;
    base_currency_name: string;
}

export interface CoinInfo{
    symbol: string,
    day: string,
    open: number,
    close: number
}

export interface CoinNews{
    title: string,
    author: string,
    article_url: string,
    description: string,
    keywords: string[]
}