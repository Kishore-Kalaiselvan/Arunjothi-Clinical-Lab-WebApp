import { useEffect, useState } from 'react';

function AdminTests() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/tests')
      .then(res => res.json())
      .then(setTests);
  }, []);

  const updatePrice = async (id, price) => {
    await fetch(`http://localhost:3001/tests/${id}/price`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: Number(price) }),
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Test Price Management</h2>

      {tests.map(test => (
        <div key={test.id} style={{ marginBottom: 10 }}>
          <strong>{test.name}</strong>

          <input
            type="number"
            defaultValue={test.price}
            style={{ marginLeft: 10 }}
            onBlur={(e) => updatePrice(test.id, e.target.value)}
          />

          <span style={{ marginLeft: 10 }}>₹</span>
        </div>
      ))}
    </div>
  );
}

export default AdminTests;
