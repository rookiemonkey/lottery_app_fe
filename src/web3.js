import Web3 from 'web3';

window.ethereum.request({ method: "eth_requestAccounts" })

export default new Web3(window.ethereum);