import { useEffect, useState } from 'react';

function AdminParameters() {
  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState('');
  const [parameters, setParameters] = useState([]);

  const [form, setForm] = useState({
    name: '',
    unit: '',
    referenceRange: '',
    displayOrder: '',
  });

  // Load all tests
  useEffect(() => {
    fetch('http://localhost:3001/tests')
      .then(res => res.json())
      .then(setTests);
  }, []);

  // Load parameters when test changes
  useEffect(() => {
    if (!selectedTestId) return;

    fetch(`http://localhost:3001/tests/${selectedTestId}/parameters`)
      .then(res => res.json())
      .then(setParameters);
  }, [selectedTestId]);

  const addParameter = async () => {
    if (!form.name || !form.displayOrder) {
      alert('Parameter name & display order required');
      return;
    }

    const res = await fetch(
      `http://localhost:3001/tests/${selectedTestId}/parameters`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          unit: form.unit,
          referenceRange: form.referenceRange,
          displayOrder: Number(form.displayOrder),
        }),
      },
    );

    if (res.ok) {
      setForm({
        name: '',
        unit: '',
        referenceRange: '',
        displayOrder: '',
      });

      const updated = await res.json();
      setParameters(prev => [...prev, updated]);
    } else {
      alert('Failed to add parameter');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin – Test Parameter Configuration</h2>

      {/* Select Test */}
      <select
        value={selectedTestId}
        onChange={e => setSelectedTestId(e.target.value)}
      >
        <option value="">Select Test</option>
        {tests.map(t => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <hr />

      {/* Existing Parameters */}
      {parameters.length > 0 && (
        <>
          <h3>Existing Parameters</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Order</th>
                <th>Name</th>
                <th>Unit</th>
                <th>Reference Range</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map(p => (
                <tr key={p.id}>
                  <td>{p.displayOrder}</td>
                  <td>{p.name}</td>
                  <td>{p.unit}</td>
                  <td>{p.referenceRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <hr />

      {/* Add Parameter */}
      {selectedTestId && (
        <>
          <h3>Add New Parameter</h3>

          <input
            placeholder="Parameter Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Unit"
            value={form.unit}
            onChange={e => setForm({ ...form, unit: e.target.value })}
          />

          <input
            placeholder="Reference Range"
            value={form.referenceRange}
            onChange={e =>
              setForm({ ...form, referenceRange: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Display Order"
            value={form.displayOrder}
            onChange={e =>
              setForm({ ...form, displayOrder: e.target.value })
            }
          />

          <br /><br />

          <button onClick={addParameter}>
            Add Parameter
          </button>
        </>
      )}
    </div>
  );
}

export default AdminParameters;
