import { useEffect } from 'react';
import Navbar from './components/Navbar'
import Search from './components/Search'
import marketoService from './services/marketo'
import './App.css';



function App() {
  let pageURL = (window.location.href).split('/')[3]
  pageURL = pageURL.split('?')[0]
  console.log('pageurl', pageURL)

  const hook = () => {
    marketoService  
      .getAllServer(pageURL)
      .then(response => console.log('frontend', response))
  }

  useEffect(hook, )

  return (
    <div id="App">
      <Navbar/>
      <Search/>
    </div>
  );
}

export default App;
