import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from '../utils/api';

const TransferPoints = () => {
    const [recipientEmail, setRecipientEmail] = useState('');
    const [platform, setPlatform] = useState('');
    const [points, setPoints] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        try {
            const { data } = await axios.post('/points/transfer', {
                recipientEmail,
                platform,
                points,
            });
            setSuccess(data.message);
        } catch (err) {
            setError(err.response?.data?.error || 'Transfer failed. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', borderRadius: '10px', backgroundColor: '#FFF', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#4B0082' }}>Transfer Points</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="recipientEmail" className="mb-3">
                    <Form.Label>Recipient Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter recipient's email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="platform" className="mb-3">
                    <Form.Label>Platform</Form.Label>
                    <Form.Control
                        as="select"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        required
                    >
                        <option value="">Select Platform</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Flipkart">Flipkart</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="points" className="mb-3">
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter points to transfer"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" style={{ width: '100%', backgroundColor: '#4B0082', border: 'none' }}>
                    Transfer
                </Button>
            </Form>
        </div>
    );
};

export default TransferPoints;
