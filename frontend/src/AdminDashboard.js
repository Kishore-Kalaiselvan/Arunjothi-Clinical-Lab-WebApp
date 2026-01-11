import { useEffect, useState } from 'react';
import AdminTests from './AdminTests';

function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [view, setView] = useState('DASHBOARD');

  useEffect(() => {
    if (view === 'DASHBOARD') {
      fetch('http://localhost:3001/revenue/summary')
        .then(res => res.json())
        .then(setSummary);
    }
  }, [view]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Panel</h2>

      <button onClick={() => setView('DASHBOARD')}>
        Revenue Dashboard
      </button>

      <button onClick={() => setView('TESTS')} style={{ marginLeft: 10 }}>
        Test Prices
      </button>

      <hr />

      {view === 'DASHBOARD' && summary && (
        <div style={{ display: 'flex', gap: 20 }}>
          <Card title="Today" value={summary.daily} />
          <Card title="Week" value={summary.weekly} />
          <Card title="Month" value={summary.monthly} />
        </div>
      )}

      {view === 'TESTS' && <AdminTests />}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 20, width: 150 }}>
      <h4>{title}</h4>
      <p>₹{value}</p>
    </div>
  );
}

export default AdminDashboard;
