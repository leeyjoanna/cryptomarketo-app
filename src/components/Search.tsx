// TODO: add search bar api here
import React, {Dispatch, SetStateAction, useState} from "react"
import marketoService from '../services/marketo'
import Result from './Result'
import ReactDOM from 'react-dom';
import { Button, TextField } from '@mui/material';
import WatchList from './WatchList';
import {CoinDB} from '../types'


type SearchProps = {
    listID: string,
    coinList: CoinDB[],
    setCoinList: Dispatch<SetStateAction<CoinDB[]>>
}
/**
 * Search returns component with text field 
 * and search funciton feature
 * 
 * @param listID
 * @param coinList 
 * @param setCoinList
 * @returns 
 */

function Search({listID, coinList, setCoinList}:SearchProps){
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ showSearch, setShowSearch ] = useState(false)
    const [ results, setResults ] = useState([])

    const handleSearch = () => {
        console.log('searching')
        console.log(searchTerm)
        marketoService
            .searchService(searchTerm)
            .then(response => {
                console.log('search result', response);
                setShowSearch(true)
                setResults(response)
            })
        return false;
    }

    return(
        <div>
            <div id="search-component">
                <div id="search-description">Curious about a coin? Look it up here by ticker or name!</div>
                <div id="search">
                    <TextField sx={{ width: '300px' }} id="outlined-basic" variant="outlined" type="text" autoComplete="off" onChange={(e) => {setSearchTerm(e.target.value)}}>
                    </TextField>
                    <Button sx={{ ml: 4 }} id="search-button" variant="contained" onClick={handleSearch}>Search</Button>
                </div>
                <div id="results">
                    <Result listID={listID} showSearch={showSearch} results={results} setShowSearch={setShowSearch} coinList={coinList} setCoinList={setCoinList}/>
                    <div className="info-container" id="coin-list">
                        <WatchList listID={listID} coinList={coinList} setCoinList={setCoinList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search