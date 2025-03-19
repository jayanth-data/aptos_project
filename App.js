import React, { useState } from 'react';
import { AptosClient } from 'aptos'; // Correct import here

const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/v1');

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionCount, setTransactionCount] = useState(null); // New state

  const handleFetchTransactions = async () => {
    if (walletAddress.trim() === '') {
      alert('Please enter a wallet address');
      return;
    }

    try {
      const transactions = await client.getAccountTransactions(walletAddress.trim());
      console.log('Fetched Transactions:', transactions);
      setTransactionCount(transactions.length); // Show how many fetched
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions. Check console.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6b46c1' }}>
        Aptos Transaction Visualizer
      </h1>

      <input
        type="text"
        placeholder="Enter Aptos Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        style={{
          padding: '10px',
          width: '300px',
          marginTop: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />

      <br />

      <button
        onClick={handleFetchTransactions}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1rem',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#6b46c1',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Fetch Transactions
      </button>

      {transactionCount !== null && (
        <p style={{ marginTop: '20px', fontSize: '1rem' }}>
          Total Transactions Fetched: <strong>{transactionCount}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
