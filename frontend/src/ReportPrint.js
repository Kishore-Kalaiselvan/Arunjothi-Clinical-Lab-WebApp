import SingleValueTemplate from './templates/SingleValueTemplate';
import TableTemplate from './templates/TableTemplate';
import './print.css';

function ReportPrint({ selectedTests, total, patient }) {

  const saveAndPrint = async () => {
    const response = await fetch('http://localhost:3001/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: patient.name,
        age: patient.age,
        sex: patient.sex,
        refBy: patient.refBy || 'Self',
        tests: selectedTests,
        totalAmount: total,
      }),
    });

    if (response.ok) {
      window.print(); // ✅ PRINT ONLY AFTER SAVE
    } else {
      alert('Failed to save report');
    }
  };

  return (
    <div className="report-page">

      {/* ===== Patient Header ===== */}
      <h3>Patient Name: {patient.name}</h3>
      <p>Age: {patient.age} | Sex: {patient.sex}</p>
      <p>Ref By: {patient.refBy || 'Self'}</p>

      <hr />

      {/* ===== Dynamic Test Templates ===== */}
      {selectedTests.map(test => {
        if (test.type === 'SINGLE') {
          return <SingleValueTemplate key={test.id} test={test} />;
        }

        if (test.type === 'TABLE') {
          return <TableTemplate key={test.id} test={test} />;
        }

        return null;
      })}

      <hr />

      {/* ===== Total ===== */}
      <strong>Total Amount: ₹{total}</strong>

      <br /><br />

      <button onClick={saveAndPrint} className="print-btn">
        Save & Print Report
      </button>

    </div>
  );
}

export default ReportPrint;
