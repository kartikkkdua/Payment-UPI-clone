import React, { useState } from 'react';
import axios from 'axios';

const TransferForm = () => {
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/transactions/transfer', {
                senderId,
                receiverId,
                amount,
            });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <div>
            <h2>Transfer Money</h2>
            <form onSubmit={handleTransfer}>
                <input
                    type="text"
                    placeholder="Sender ID"
                    value={senderId}
                    onChange={(e) => setSenderId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Receiver ID"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit">Transfer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TransferForm;
