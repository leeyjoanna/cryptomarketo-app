import React, {Dispatch, SetStateAction} from 'react';
import marketoService from '../services/marketo'
import {CoinDB, CoinInfo, CoinNews} from '../types'
import {Button, Typography, Popover} from '@mui/material'
import {DeleteForeverOutlined} from '@mui/icons-material'

type WatchListProps = {
    listID: string,
    coinList: CoinDB[],
    setCoinList: Dispatch<SetStateAction<CoinDB[]>>,
    coinData: CoinInfo | undefined,
    setCoinData: Dispatch<SetStateAction<CoinInfo | undefined>>,
    coinNews: CoinNews[],
    setCoinNews: Dispatch<SetStateAction<CoinNews[]>>,
    coinName: string,
    setCoinName: Dispatch<SetStateAction<string>>,
    setShowSearch: Dispatch<SetStateAction<boolean>>,
}
/**
 * WatchList returns component with user's saved coins
 * Data is dated and old until user elects to refresh the list
 * 
 * @param listID
 * @param coinList 
 * @param setCoinList
 * @param coinData
 * @param setCoinData
 * @param coinNews
 * @param setCoinNews
 * @param coinName
 * @param setCoinName
 * 
 * @returns 
 */

function WatchList({listID, coinList, setCoinList, coinData, setCoinData, coinNews, setCoinNews, coinName, setCoinName, setShowSearch}:WatchListProps){
    /** logic for popover */
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleRefresh = (listID:string) => {
        marketoService
            .refreshList(listID)
            .then(response => {
                console.log(response);
                setCoinList(response);
            })
            .catch((e) => console.log(e))
    }

    const handleCoinClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, ticker:string, name:string) => {
            console.log('clicked this', e.currentTarget.id)
            setCoinName(name)
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

    const handleDelete = (e:React.MouseEvent<SVGSVGElement, MouseEvent>, ticker:string) => {
        e.stopPropagation();
        let updatedList = coinList.filter((coin) => coin.ticker !== ticker)
        marketoService
            .updateList(updatedList, listID)
            .then(response => {
                console.log(response);
                setCoinList(updatedList);
            })
            .catch((e) => console.log(e))
        return false;
    }

    return(
        <div>
            <div className="module-header">My Watch List <Button variant="outlined" size="small" onClick={(e) => handleRefresh(listID)}>refresh</Button>
                    <Button aria-describedby={id} variant="text" size="small" onClick={handleClick}>?</Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                    >
                    <Typography sx={{ p: 2 }}>API calls are limited to 5/minute, it may take some time to refresh your list and update any prices.</Typography>
                     </Popover>
            </div>
            <div>
                {coinList?.map((coinItem, idx) => (
                    <div onClick={(e) => handleCoinClick(e, coinItem.ticker, coinItem.name)} className="watchlist-coin-container" key={idx} id={coinItem.ticker}> 
                    <div>
                        <div className="watchlist-coin-name"><b>{coinItem.ticker}: </b>{coinItem.name} </div>
                        <div className="watchlist-coin-price">${coinItem.last_price} as of {coinItem.date}</div>
                    </div>
                    <div><DeleteForeverOutlined onClick={(e) => handleDelete(e, coinItem.ticker)} id={coinItem.name} className="delete-icon"/></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WatchList