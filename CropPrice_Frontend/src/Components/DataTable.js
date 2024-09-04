import React from 'react';

const DataTable = ({ data }) => {
  const tableData = Array.isArray(data) ? data : [];

  return (
    <div style={{ margin: '20px auto', maxWidth: '90%', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#009879', color: '#ffffff', textAlign: 'left' }}>
            <th style={headerStyle}>State</th>
            <th style={headerStyle}>District</th>
            <th style={headerStyle}>Market</th>
            <th style={headerStyle}>Commodity</th>
            <th style={headerStyle}>Variety</th>
            <th style={headerStyle}>Grade</th>
            <th style={headerStyle}>Arrival Date</th>
            <th style={headerStyle}>Min Price</th>
            <th style={headerStyle}>Max Price</th>
            <th style={headerStyle}>Modal Price</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={cellStyle}>{item.state}</td>
                <td style={cellStyle}>{item.district}</td>
                <td style={cellStyle}>{item.market}</td>
                <td style={cellStyle}>{item.commodity}</td>
                <td style={cellStyle}>{item.variety}</td>
                <td style={cellStyle}>{item.grade}</td>
                <td style={cellStyle}>{item.arrival_date}</td>
                <td style={cellStyle}>{item.min_price}</td>
                <td style={cellStyle}>{item.max_price}</td>
                <td style={cellStyle}>{item.modal_price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ ...cellStyle, textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle = {
  padding: '12px 15px',
  textTransform: 'uppercase',
  border: '1px solid #ddd',
};

const cellStyle = {
  padding: '12px 15px',
  border: '1px solid #ddd',
  textAlign: 'left',
  color: '#333',
};

const evenRowStyle = {
  backgroundColor: '#f3f3f3',
};

const oddRowStyle = {
  backgroundColor: '#ffffff',
};

export default DataTable;
