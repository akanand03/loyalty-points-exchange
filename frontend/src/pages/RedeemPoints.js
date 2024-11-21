import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../utils/api';

const RedeemPoints = () => {
    const [formData, setFormData] = useState({ platform: '', points: '', amount: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!formData.platform || !formData.points || !formData.amount || formData.points <= 0 || formData.amount <= 0) {
            setError('Please fill all fields correctly.');
            return;
        }
        try {
            const { data } = await axios.post(
                '/points/redeem',
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setSuccess(`Redeemed successfully! Order ID: ${data.orderId}`);
            // Razorpay Payment Flow Here (Optional)
        } catch (err) {
            setError(err.response?.data?.error || 'Redemption failed. Please try again.');
        }
    };

    return (
        <Container style={{ maxWidth: '500px', marginTop: '50px', padding: '20px', borderRadius: '10px', backgroundColor: '#FFF', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
            <h1 style={{ textAlign: 'center', color: '#4B0082' }}>Redeem Points</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="platform" className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Platform</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., Amazon"
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                        style={{ borderRadius: '5px' }}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="points" className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Points</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter points to redeem"
                        name="points"
                        value={formData.points}
                        onChange={handleInputChange}
                        style={{ borderRadius: '5px' }}
                        required
                        min="1"
                    />
                </Form.Group>
                <Form.Group controlId="amount" className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Redeem Amount (₹)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount in INR"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        style={{ borderRadius: '5px' }}
                        required
                        min="1"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#4B0082', border: 'none', padding: '10px 0' }}>
                    Redeem
                </Button>
            </Form>
        </Container>
    );
};

export default RedeemPoints;
