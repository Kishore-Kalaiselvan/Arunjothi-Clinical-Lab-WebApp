function ReportPrint({ selectedTests, total }) {

  const saveAndPrint = async () => {
    const response = await fetch('http://localhost:3001/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient: {
          name: 'TEMP',
          age: '',
          sex: '',
        },
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
      {/* report content stays same */}

      <button onClick={saveAndPrint} className="print-btn">
        Save & Print Report
      </button>
    </div>
  );
}

export default ReportPrint;
