import React, { useState, useCallback } from 'react';
import lottery from '../contracts/Lottery';
import web3 from '../web3';

const JoinForm = () => {
  const [state, setState] = useState({ value: 0, message: null })

  const onchange = useCallback(e => setState({ ...state, value: e.target.value }), [])

  const onsubmit = useCallback(async e => {
    try {
      e.preventDefault();

      setState({ ...state, message: 'Please wait' })

      const [connectedMetamaskAccount] = await web3.eth.getAccounts();

      await lottery.methods.enter().send({
        from: connectedMetamaskAccount,
        value: web3.utils.toWei(state.value, 'ether')
      })

      setState({ ...state, message: 'Successfully entered the lottery!' })
    }

    catch(e) {
      console.log(e)
      setState({ ...state, message: 'Something Went Wrong upon entering the lottery!' })
    }
  }, [state.value])

  return(
    <form onSubmit={onsubmit}>
      <h2>Want to try your luck?</h2>

      <div>
        <label>Amount of Ether to enter</label>
        <input type="text" value={state.value} onChange={onchange} />
      </div>

      <div>
        <button>Enter</button>
      </div>

      <div>
        <p>{ state.message ? state.message : '' }</p>
      </div>
    </form>
  )
}

export default JoinForm;