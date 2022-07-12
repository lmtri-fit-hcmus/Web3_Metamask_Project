import './App.css';
import 'bulma/css/bulma.min.css';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import detectEthereumProvider from "@metamask/detect-provider"
import { loadContract } from './utils/load-contract';


function App() {

    const [web3Api, setWeb3Api] = useState({
      provider: null,
      web3: null,
      contract: null
    });
    
    const [account, setAccount] = useState(null)

    useEffect(()=>{
      const loadProvider = async()=>{
        const provider = await detectEthereumProvider();
        const contract = await loadContract('Faucet',provider)


        if(provider){
          //provider.request({method: "eth_requestAccounts"})
          setWeb3Api({
            web3: new Web3(provider),
            provider,
            contract
          })
        }
        else{
          console.error("Please install metamask")
        }
      }
      loadProvider()
    },[])
     
    useEffect(()=>{
      const getAccount = async()=>{
        const accounts = await web3Api.web3.eth.getAccounts()
        setAccount(accounts[0])
      }
      web3Api.web3 && getAccount()
    },[web3Api.web3])

  return (
    <div className='faucet-wrapper'>
      <div className='faucet'>
        <div className='balance-view is-size-2'>
          Account Balance: <strong>100ETH</strong>
        </div>
        <button className='button is-primary mr-2 ml-2 '>Donate</button>
        <button className='button is-danger mr-2 ml-2 '>Withdraw</button>
        <button className='button is-link ml-2 '
            onClick={()=>web3Api.provider.request({method:"eth_requestAccounts"})}
        >
          Connect to wallet  
        </button>
        <span>
          <p>
            <strong>Account Address: </strong>
            {
            account != null ? account : "Accounts Denied"  
            }
          </p>
        </span>
      </div>
    </div>
  );
}

export default App