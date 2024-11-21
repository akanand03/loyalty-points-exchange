import React, { useState } from 'react';
import axios from '../utils/api';

const TransferPoints = () => {
    const [email, setEmail] = useState('');
    const [platform, setPlatform] = useState('');
    const [points, setPoints] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!email || !platform || !points || points <= 0) {
            setError('Please fill all fields correctly.');
            return;
        }

        try {
            const { data } = await axios.post(
                '/points/transfer',
                { recipientEmail: email, platform, points },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setSuccess(`Points transferred successfully! Transaction ID: ${data.transactionHash}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Transfer failed.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', borderRadius: '10px', backgroundColor: '#FFF', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#4B0082' }}>Transfer Points</h2>
            {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="email"
                    placeholder="Recipient Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    required
                />
                <input
                    type="text"
                    placeholder="Platform (e.g., Amazon)"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    required
                />
                <input
                    type="number"
                    placeholder="Points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    required
                    min="1"
                />
                <button type="submit" style={{ backgroundColor: '#4B0082', color: '#FFF', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Transfer
                </button>
            </form>
        </div>
    );
};

export default TransferPoints;
