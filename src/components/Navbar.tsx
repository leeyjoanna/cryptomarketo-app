import  marketoService from '../services/marketo'

function Navbar():JSX.Element {
    const handleHomeClick:any = () => {
        console.log('clicked')
        window.location.reload()
        return false
    }
    return(
        <div id="navbar">
            <h1 onClick={handleHomeClick}>CryptoMarketo</h1>
        </div>
    )
}

export default Navbar