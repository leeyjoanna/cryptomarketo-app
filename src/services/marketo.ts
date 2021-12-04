import axios from 'axios'

const getHome = () => {
    const request = axios.get(`/`)
    return request.then(response => response.data)
}

const getList = (uuid:string) => {
    const request = axios.get(`/api/myList/${uuid}`)
    return request.then(response => response.data)
}

const getCoin = (coinID:string) => {
    const request = axios.get(`/api/coin/${coinID}`, {params: coinID})
    return request.then(response => response.data)
} 

const getCoinNews = (coinID:string) => {
    const request = axios.get(`api/coinNews/${coinID}`, {params: coinID})
    return request.then(response => response.data)
}

const testService = () => {
    const request = axios.get(`/api/testing`);
    return request.then(response => response.data)
}

const searchService = (searchTerm:string) => {
    const request = axios.get(`/api/search/`, {params: searchTerm})
    return request.then(response => response.data)
}

const getAllServer = (url:string) => {
    const request = axios.get(`/api/${url}`)
    return request.then(response => response.data)
}

const services = {
    getHome,
    getList, 
    getCoin,
    getCoinNews,
    testService,
    getAllServer,
    searchService
};

export default services;