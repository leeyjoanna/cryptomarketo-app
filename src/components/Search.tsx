// TODO: add search bar api here
import { useState } from 'react';
import marketoService from '../services/marketo'
import Result from './Result'
import ReactDOM from 'react-dom';
import { Button, TextField } from '@mui/material';


function Search():JSX.Element{
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ showCoin, setShowCoin ] = useState(false)
    const [ results, setResults ] = useState([])

    const handleSearch = () => {
        console.log('searching')
        console.log(searchTerm)
        marketoService
            .searchService(searchTerm)
            .then(response => {
                console.log('search result', response);
                setShowCoin(true)
                setResults(response)
            })
        return false;
    }

    return(
        <div>
            <div id="search">
                <TextField id="outlined-basic" variant="outlined" type="text" autoComplete="off" onChange={(e) => {setSearchTerm(e.target.value)}}>
                </TextField>
                <Button variant="contained" onClick={handleSearch}>Search</Button>
            </div>
            <div id="results">
                <Result showCoin={showCoin} results={results}/>
            </div>
        </div>
    )
}

export default Search