import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from '../utils/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [points, setPoints] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPointsAndTransactions = async () => {
      try {
        const { data } = await axios.get('/points', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPoints(data.points || {});
        setTransactions(data.transactions || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch data.');
      }
    };

    fetchPointsAndTransactions();
  }, []);

  const platforms = Object.keys(points);
  const pointsData = Object.values(points);

  const chartData = {
    labels: platforms,
    datasets: [
      {
        label: 'Points',
        data: pointsData,
        backgroundColor: ['#4B0082', '#2874F0', '#FF9900', '#6C757D'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Points Distribution Across Platforms',
      },
    },
  };

  return (
    <Container fluid className="dashboard" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#4B0082',
          color: '#fff',
          padding: '20px',
          position: 'fixed',
          height: '100%',
        }}
      >
        <h4>Dashboard</h4>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Home
            </a>
          </li>
          <li>
            <a href="/transfer" style={{ color: '#fff', textDecoration: 'none' }}>
              Transfer Points
            </a>
          </li>
          <li>
            <a href="/redeem" style={{ color: '#fff', textDecoration: 'none' }}>
              Redeem Points
            </a>
          </li>
          <li>
            <a href="/add-points" style={{ color: '#fff', textDecoration: 'none' }}>
              Add Points
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)', padding: '20px' }}>
        <h2>Your Dashboard</h2>
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

        {/* Points Cards */}
        <Row>
          {Object.entries(points).map(([platform, point]) => (
            <Col md={4} key={platform}>
              <Card
                style={{
                  border: '2px solid #4B0082',
                  borderRadius: '10px',
                  textAlign: 'center',
                  margin: '10px 0',
                }}
              >
                <Card.Body>
                  <Card.Title>{platform}</Card.Title>
                  <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>{point} Points</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Bar Chart */}
        <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          <h4>Points Distribution</h4>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Transaction History */}
        <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          <h4>Transaction History</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Platform</th>
                <th>Type</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id}>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                  <td>{txn.platform}</td>
                  <td>{txn.type}</td>
                  <td>{txn.points}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
