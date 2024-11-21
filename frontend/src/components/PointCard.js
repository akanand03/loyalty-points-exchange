import React from 'react';
import { Card, ProgressBar, Badge } from 'react-bootstrap';
import amazonLogo from '../assets/amazon-logo.webp';
import flipkartLogo from '../assets/flipkart-logo.webp';

const PointCard = ({ platform, points, maxPoints }) => {
  const platformLogos = {
    Amazon: amazonLogo,
    Flipkart: flipkartLogo,
  };

  const platformColors = {
    Amazon: '#FF9900',
    Flipkart: '#2874F0',
  };

  return (
    <Card
      style={{
        border: `2px solid ${platformColors[platform]}`,
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <Card.Body style={{ display: 'flex', alignItems: 'center', padding: '15px' }}>
        <img
          src={platformLogos[platform]}
          alt={`${platform} Logo`}
          style={{
            width: '50px',
            height: '50px',
            marginRight: '20px',
          }}
        />
        <div style={{ flex: 1 }}>
          <Card.Title style={{ margin: 0, fontWeight: 'bold' }}>{platform}</Card.Title>
          <Badge
            style={{
              backgroundColor: platformColors[platform],
              color: '#FFFFFF',
              padding: '5px 10px',
              marginTop: '10px',
              fontSize: '0.9rem',
            }}
          >
            {points} Points
          </Badge>
        </div>
      </Card.Body>
      <ProgressBar
        now={(points / maxPoints) * 100}
        style={{ height: '10px', backgroundColor: '#EAEAEA' }}
        variant="info"
      />
    </Card>
  );
};

export default PointCard;
