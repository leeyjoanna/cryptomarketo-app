import React from 'react'

// type CoinProps = {
//     item: {key: string, value: string},
// }
function Coin(prop: any) {
    console.log('inside coin', prop.item)
    return(
        <div>
            {Object.entries(prop.item).map(([key, value]) => <div>{key.split(" ")[1 ]}: {value}</div>)}
            ----------------
        </div>
    )
}

export default Coin