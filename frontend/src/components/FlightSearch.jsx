import React, { useState } from 'react';

const FlightSearch = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ origin, destination });
  };

  return (
    <div className="card">
      <h2>Book a Flight</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Origin</label>
          <input 
            type="text" 
            value={origin} 
            onChange={(e) => setOrigin(e.target.value)} 
            placeholder="City or Airport" 
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Destination</label>
          <input 
            type="text" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            placeholder="City or Airport" 
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '15px' }}>
            <button type="submit" className="btn btn-primary">Search Flights</button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;
