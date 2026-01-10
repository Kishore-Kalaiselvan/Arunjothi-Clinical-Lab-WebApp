import { useEffect, useState } from 'react';
import ReportPrint from './ReportPrint';
import './print.css';

function App() {
  const [tests, setTests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/tests')
      .then(res => res.json())
      .then(setTests);
  }, []);

  const toggleTest = (test) => {
    setSelected(prev =>
      prev.find(t => t.id === test.id)
        ? prev.filter(t => t.id !== test.id)
        : [...prev, test]
    );
  };

  const total = selected.reduce((sum, t) => sum + t.price, 0);

  if (showReport) {
    return <ReportPrint selectedTests={selected} total={total} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Staff – Select Tests</h2>

      {tests.map(test => (
        <div key={test.id}>
          <input type="checkbox" onChange={() => toggleTest(test)} />
          {test.name} – ₹{test.price}
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        disabled={selected.length === 0}
        onClick={() => setShowReport(true)}
      >
        Generate Report
      </button>
    </div>
  );
}

export default App;
