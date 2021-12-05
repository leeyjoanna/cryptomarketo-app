import axios from "axios";
import { CoinDB } from "../types";

const getHome = () => {
  const request = axios.get(`/`);
  return request.then((response) => response.data);
};

const refreshList = (listID: string) => {
  const request = axios.get(`/api/myList/refresh/${listID}`);
  return request.then((response) => response.data);
};

const getList = (listID: string) => {
  const request = axios.get(`/api/myList/${listID}`);
  return request.then((response) => response.data);
};

const createList = (listID: string)=> {
  const request = axios.post(`/api/myList/${listID}`);
  return request.then((response) => response.data);
};

const updateList = (
  updatedList: CoinDB[],
  listID: string
) => {
  const request = axios.put(`/api/myList/${listID}`, { data: updatedList });
  return request.then((response) => response.data);
};

const getCoin = (coinID: string) => {
  const request = axios.get(`/api/coin/${coinID}`, { params: coinID });
  return request.then((response) => response.data);
};

const getCoinNews = (coinID: string) => {
  const request = axios.get(`api/coinNews/${coinID}`, { params: coinID });
  return request.then((response) => response.data);
};

const searchService = (searchTerm: string) => {
  const request = axios.get(`/api/search/`, { params: searchTerm });
  return request.then((response) => response.data);
};

const services = {
  getHome,
  refreshList,
  getList,
  createList,
  updateList,
  getCoin,
  getCoinNews,
  searchService,
};

export default services;
