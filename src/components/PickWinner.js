import React, { useState, useEffect, useCallback } from "react";
import web3 from "../web3";
import lottery from "../contracts/Lottery";

const PickWinner = () => {
  const [state, setState] = useState({ message: null, connectedMetamaskAccount: null, isManager: false })

  useEffect(() => {
    (async () => {
      try {
        const manager = await lottery.methods.manager().call()
        const [connectedMetamaskAccount] = await web3.eth.getAccounts();

        setState({ ...state, connectedMetamaskAccount, isManager: manager == connectedMetamaskAccount ? true : false  })
      }

      catch (e) {
        console.log(e)
      }
    })()
  }, [state.connectedMetamaskAccount])

  const onclick = useCallback(async () => {
    try {
      setState({ ...state, message: 'Please wait while we are picking the winner' })

      await lottery.methods.pickWinner().send({ from: state.connectedMetamaskAccount })

      setState({ ...state, message: 'Winner has been picked!' })
    }

    catch(e) {
      console.log(e)
      setState({ ...state, message: 'Something Went Wrong upon picking the winner!' })
    }
  }, [state.connectedMetamaskAccount])

  return (
    <div className="winner-container">
      {
        state.isManager
          ? <>
              <h2>Time to pick a winner!</h2>
              <button onClick={onclick}>Pick a winner!</button>
              <p>{state.message}</p>
            </>
          : null
      }
    </div>
  )
}

export default PickWinner