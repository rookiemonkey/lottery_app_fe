import React, { useEffect, useState } from "react";
import web3 from "../web3";
import lottery from "../contracts/Lottery";

const Detail = () => {

  const [state, setState] = useState({ manager: null, price: null, players: [] })

  useEffect(() => {
    (async () => {
      try {
        const manager = await lottery.methods.manager().call()
        const players = await lottery.methods.getPlayers().call()
        const price = await web3.eth.getBalance(lottery.options.address)

        setState({ ...state, manager, players, price: web3.utils.fromWei(price) })
      }

      catch(e) {
        console.log(e)
      }
    })()
  })

  return (
    <div className="details-container">
      <h2>Lottery Contract</h2>

      <p>This contract is managed by {state.manager}</p>
      <p>There are currently {state.players.length} people entered, competing to win {state.price} ether!</p>
    </div>
  )
}

export default Detail