import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import marketoService from "./services/marketo";
import { CoinDB } from "./types";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  const [coinList, setCoinList] = useState<CoinDB[]>([]);
  const [listID, setListID] = useState<string>("");

  const hook = () => {
    const cookies = new Cookies();
    const cookiesListID = cookies.get("marketoListID");
    if (cookiesListID) {
      setListID(cookiesListID);
      marketoService
        .getList(cookiesListID)
        .then((response) => {
          setCoinList(response.coins);
        })
        .catch((e) => console.log(e));
    } else {
      const newID: string = uuid();
      cookies.set("marketoListID", newID, { path: "/" });
      setListID(newID);
      marketoService
        .createList(newID)
        .then((response) => {
          setCoinList(response.coins);
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(hook, []);

  return (
    <div id="App">
      <Navbar />
      <Search listID={listID} coinList={coinList} setCoinList={setCoinList} />
    </div>
  );
}

export default App;
