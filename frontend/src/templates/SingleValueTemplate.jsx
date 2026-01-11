function SingleValueTemplate({ test }) {
  return (
    <div style={{ marginBottom: '25px' }}>
      <h4>{test.name}</h4>

      <table width="100%" border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Parameter</th>
            <th align="left">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{test.name}</td>
            <td>__________</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SingleValueTemplate;
