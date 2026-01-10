import { useState } from "react";

function App() {
  const tests = [
    { id: 1, name: "CBC", price: 300 },
    { id: 2, name: "Hemoglobin", price: 150 },
    { id: 3, name: "Blood Sugar", price: 100 },
    { id: 4, name: "Serum Urea", price: 200 },
  ];

  const [screen, setScreen] = useState("select");

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [refByDr, setRefByDr] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const [selectedTests, setSelectedTests] = useState([]);
  const [reportValues, setReportValues] = useState({});

  /* ---------- helpers ---------- */
  const handleCheckboxChange = (test) => {
    const exists = selectedTests.find(t => t.id === test.id);
    if (exists) {
      setSelectedTests(selectedTests.filter(t => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const handleValueChange = (testId, value) => {
    setReportValues({
      ...reportValues,
      [testId]: value
    });
  };

  const totalAmount = selectedTests.reduce(
    (sum, test) => sum + test.price,
    0
  );

  const isFormValid =
    patientName &&
    age &&
    gender &&
    reportDate &&
    refByDr &&
    paymentMode &&
    totalAmount > 0;

  // yyyy-mm-dd → dd-mm-yyyy
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  /* ================= PREVIEW / PRINT ================= */
  if (screen === "preview") {
    return (
      <div
        style={{
          width: "210mm",
          height: "297mm",
          position: "relative",
          margin: "0 auto",
          fontSize: "14px"
        }}
      >
        <div style={{ position: "absolute", top: "140px", left: "80px" }}>
          <b>Pt's Name :</b> {patientName}
        </div>

        <div style={{ position: "absolute", top: "140px", left: "420px" }}>
          <b>Sex :</b> {gender} / {age} yrs
        </div>

        <div style={{ position: "absolute", top: "140px", left: "650px" }}>
          <b>Date :</b> {formatDate(reportDate)}
        </div>

        <div style={{ position: "absolute", top: "175px", left: "80px" }}>
          <b>Ref by Dr :</b> {refByDr}
        </div>

        <div
          style={{
            position: "absolute",
            top: "230px",
            width: "100%",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          BLOOD REPORT
        </div>

        {selectedTests.map((test, index) => (
          <div key={test.id}>
            <div
              style={{
                position: "absolute",
                top: `${300 + index * 40}px`,
                left: "120px"
              }}
            >
              {test.name}
            </div>

            <div
              style={{
                position: "absolute",
                top: `${300 + index * 40}px`,
                left: "350px"
              }}
            >
              : {reportValues[test.id]}
            </div>
          </div>
        ))}

        {/* Visible on screen, hidden in print */}
        <button
          className="no-print"
          style={{ position: "absolute", bottom: "40px", left: "350px" }}
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>
    );
  }

  /* ================= REPORT ENTRY ================= */
  if (screen === "report") {
    return (
      <div style={{ padding: "20px", maxWidth: "500px" }}>
        <h2>Report Entry</h2>

        <p><b>Patient:</b> {patientName}</p>
        <p><b>Age:</b> {age}</p>
        <p><b>Gender:</b> {gender}</p>

        <hr />

        {selectedTests.map(test => (
          <div key={test.id} style={{ marginBottom: "10px" }}>
            <label>
              {test.name} :
              <input
                type="text"
                value={reportValues[test.id] || ""}
                onChange={(e) => handleValueChange(test.id, e.target.value)}
              />
            </label>
          </div>
        ))}

        <hr />

        <button onClick={() => setScreen("preview")}>
          Save & Print
        </button>
      </div>
    );
  }

  /* ================= HOME ================= */
  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Test Selection</h2>

      <h4>Patient Details</h4>

      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      /><br /><br />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      /><br /><br />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select><br /><br />

      <input
        type="date"
        value={reportDate}
        onChange={(e) => setReportDate(e.target.value)}
      /><br /><br />

      <input
        type="text"
        placeholder="Ref by Dr"
        value={refByDr}
        onChange={(e) => setRefByDr(e.target.value)}
      /><br /><br />

      <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
        <option value="">Payment Mode</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
      </select>

      <hr />

      <h4>Available Tests</h4>
      {tests.map(test => (
        <div key={test.id}>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(test)}
            />
            {test.name} – ₹{test.price}
          </label>
        </div>
      ))}

      <hr />

      <h3>Total Amount: ₹{totalAmount}</h3>

      <button disabled={!isFormValid} onClick={() => setScreen("report")}>
        Generate Report
      </button>
    </div>
  );
}

export default App;
