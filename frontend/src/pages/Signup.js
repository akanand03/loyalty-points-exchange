import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await axios.post('/api/users/register', formData); // Corrected API path
            setSuccess(data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed.');
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const { data } = await axios.post('/api/users/google-login', { tokenId: credentialResponse.credential }); // Corrected API path
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.error || 'Google Sign Up Failed.');
        }
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Container>
                <h3>Sign Up</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleInputChange} required />
                    </Form.Group>
                    <Button type="submit">Sign Up</Button>
                </Form>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => setError('Google Sign Up Failed.')}
                />
            </Container>
        </GoogleOAuthProvider>
    );
};

export default Signup;
