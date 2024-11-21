import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const RedeemForm = ({ onSubmit }) => {
  const [platform, setPlatform] = useState('');
  const [points, setPoints] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!platform || !points) {
      setError('All fields are required');
      return;
    }
    setError('');
    onSubmit({ platform, points });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        padding: '20px',
        border: '2px solid #4B0082',
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#FFFFFF',
      }}
    >
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="platform">
        <Form.Label style={{ fontWeight: 'bold' }}>Platform</Form.Label>
        <Form.Control
          as="select"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          style={{ borderRadius: '5px' }}
        >
          <option value="">Select a platform</option>
          <option value="Amazon">Amazon</option>
          <option value="Flipkart">Flipkart</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="points" className="mt-3">
        <Form.Label style={{ fontWeight: 'bold' }}>Points to Redeem</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          style={{ borderRadius: '5px' }}
        />
      </Form.Group>
      <Button type="submit" className="mt-3" style={{ backgroundColor: '#4B0082', border: 'none' }}>
        Redeem
      </Button>
    </Form>
  );
};

export default RedeemForm;
