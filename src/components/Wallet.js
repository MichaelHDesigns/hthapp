import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useWallet } from '../WalletContext';
import logo from '../images/hthlogo.png';

const headerContainerStyles = {
  position: 'relative',
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
};

const logoStyles = {
  width: '100px',
  height: 'auto',
  marginLeft: '35%',
  backgroundColor: 'transparent',
};

const headStyles = {
  fontSize: '2.5rem',
  marginRight: '40%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

function Wallets() {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [copyNotification, setCopyNotification] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');
  const { connected, setConnected } = useWallet();
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    if (connected) {
      loadWalletData();
    } else {
      console.log('Wallet not connected.');
    }
  }, [connected]);

  const loadWalletData = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setWalletAddress(accounts[0]);

      const balance = await web3.eth.getBalance(accounts[0]);
      setWalletBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
      console.error('Error loading wallet data:', error);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.enable();
      setConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleDisconnectWallet = () => {
    setConnected(false);
    setWalletAddress('');
    setWalletBalance('');
  };

  const handleSendToken = async () => {
    try {
      const amountWei = web3.utils.toWei(amountToSend, 'ether');
      const txData = {
        from: walletAddress,
        to: recipientAddress,
        value: amountWei,
      };

      // Set transaction status to "Waiting to confirm"
      setTransactionStatus('Waiting to confirm');

      // Send transaction
      const transactionHash = await web3.eth.sendTransaction(txData);

      // Set transaction status to "Confirmed" after confirmation
      setTransactionStatus('Confirmed');

      // Clear input fields and close modal
      setRecipientAddress('');
      setAmountToSend('');
      setSendModalVisible(false);

      // Clear transaction status after 3 seconds
      setTimeout(() => {
        setTransactionStatus('');
      }, 3000);
    } catch (error) {
      console.error('Error sending tokens:', error);
      setTransactionStatus('Error'); // Update status in case of error
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopyNotification(true);
    setTimeout(() => {
      setCopyNotification(false);
    }, 3000);
  };

  const truncatedAddress = walletAddress.substring(0, 10) + '...' + walletAddress.substring(walletAddress.length - 6);

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={headStyles}>User Wallet</h1>
          {connected ? (
            <button style={{ backgroundColor: 'red', color: 'black', fontWeight: 'bold' }} className="connectButton" onClick={handleDisconnectWallet}>
              Disconnect
            </button>
          ) : (
            <button className="connectButton" onClick={handleConnectWallet}>
              Connect
            </button>
          )}
        </header>
      </div>
      <br />
      <br />
      <div className="Wallet-info">
        <h2>Wallet Information</h2>
<br />
        {walletAddress && (
          <div>
            <p className="Wallet-address" onClick={handleCopyAddress}>
              Wallet Address: <span className="Clickable-address">{truncatedAddress}</span>
            </p>
            <p className="Wallet-balance">Wallet Balance: <br />{walletBalance} HTHW</p>
          </div>
        )}
      </div>
      <div className="Transaction-container">
        <div className="Send-section">
          <h2>Send Tokens</h2>
          <button className="sendButtonModal" onClick={() => setSendModalVisible(true)}>
            Send
          </button>
        </div>
      </div>
      {sendModalVisible && (
        <div className="Send-modal">
          <h2>Send Tokens</h2>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount to Send"
            value={amountToSend}
            onChange={(e) => setAmountToSend(e.target.value)}
          />
          <button onClick={handleSendToken}>Send</button>
          <button onClick={() => setSendModalVisible(false)}>Cancel</button>
        </div>
      )}
      {copyNotification && (
        <div className="Copy-notification">
          Address Copied!
        </div>
      )}
      {transactionStatus && (
        <div className="Transaction-status">
          {transactionStatus}
        </div>
      )}
      <br />
      <br />
    </div>
  );
}

export default Wallets;