import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [flights, setFlights] = useState([]);
  const [showAddFlight, setShowAddFlight] = useState(false);

  // MOCK DATA
  const MOCK_FLIGHTS = [
    { flightNumber: "ET302", origin: "ADD", destination: "NBO", departureTime: "2023-12-01T08:00", arrivalTime: "2023-12-01T10:00", price: 250.00 },
    { flightNumber: "ET500", origin: "ADD", destination: "IAD", departureTime: "2023-12-01T10:00", arrivalTime: "2023-12-01T20:00", price: 1200.00 },
    { flightNumber: "ET999", origin: "ADD", destination: "DXB", departureTime: "2023-12-05T14:00", arrivalTime: "2023-12-05T18:00", price: 450.00 }
  ];

  const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/search');
      if (!response.ok) throw new Error("Failed to fetch flights");
      const data = await response.json();
      setFlights(data && data.length > 0 ? data : MOCK_FLIGHTS); // Use mock if empty too for demo
    } catch (err) {
      console.warn("Backend error, using mock data", err);
      setFlights(MOCK_FLIGHTS);
    }
  };

  useEffect(() => {
    fetchFlights();
    fetchBookings();
  }, []);

  // Bookings Logic
  const [bookings, setBookings] = useState([]);
  const MOCK_BOOKINGS = [
    { bookingReference: "ET-MOCK-1", flightNumber: "ET302", passengerName: "Demo User", origin: "ADD", destination: "NBO" }
  ];

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/book');
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.warn("Backend error fetching bookings, using mock", err);
      // If in demo mode for flights, likely in demo mode for bookings too
      if (flights.length > 0 && flights === MOCK_FLIGHTS) {
        setBookings(MOCK_BOOKINGS);
      }
    }
  };

  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: ''
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newFlight,
          price: parseFloat(newFlight.price)
        })
      });
      if (response.ok) {
        alert("Flight Added Successfully!");
        setNewFlight({ flightNumber: '', origin: '', destination: '', departureTime: '', arrivalTime: '', price: '' });
        setShowAddFlight(false);
        fetchFlights();
      } else {
        alert("Failed to add flight");
      }
    } catch (err) {
      console.warn("Backend error, adding to local list (Demo Mode)");
      const demoFlight = { ...newFlight, price: parseFloat(newFlight.price) };
      setFlights([...flights, demoFlight]);
      setNewFlight({ flightNumber: '', origin: '', destination: '', departureTime: '', arrivalTime: '', price: '' });
      setShowAddFlight(false);
      alert("Flight Added (Demo Mode - Backend Unreachable)");
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Admin Panel - Flight Management</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Active Flights</h3>
        <button className="btn btn-primary" onClick={() => setShowAddFlight(!showAddFlight)}>
          {showAddFlight ? "Cancel Adding" : "Add New Flight"}
        </button>
      </div>

      {showAddFlight && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h4>Add New Flight</h4>
          <form onSubmit={handleAddSubmit}>
            <div className="form-group">
              <label>Flight Number</label>
              <input type="text" className="form-control" required
                value={newFlight.flightNumber}
                onChange={e => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
                placeholder="e.g. ET999"
              />
            </div>
            <div className="form-group">
              <label>Origin Code</label>
              <input type="text" className="form-control" required maxLength="3"
                value={newFlight.origin}
                onChange={e => setNewFlight({ ...newFlight, origin: e.target.value.toUpperCase() })}
                placeholder="ADD"
              />
            </div>
            <div className="form-group">
              <label>Destination Code</label>
              <input type="text" className="form-control" required maxLength="3"
                value={newFlight.destination}
                onChange={e => setNewFlight({ ...newFlight, destination: e.target.value.toUpperCase() })}
                placeholder="LHR"
              />
            </div>
            <div className="form-group">
              <label>Departure Time</label>
              <input type="datetime-local" className="form-control" required
                value={newFlight.departureTime}
                onChange={e => setNewFlight({ ...newFlight, departureTime: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Arrival Time</label>
              <input type="datetime-local" className="form-control" required
                value={newFlight.arrivalTime}
                onChange={e => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Price (USD)</label>
              <input type="number" className="form-control" required step="0.01"
                value={newFlight.price}
                onChange={e => setNewFlight({ ...newFlight, price: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success" style={{ marginTop: '10px' }}>Save Flight</button>
          </form>
        </div>
      )}

      <table width="100%" border="1" cellPadding="10" style={{ borderCollapse: 'collapse', borderColor: '#ccc' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>Flight #</th>
            <th>Route</th>
            <th>Schedule</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f, i) => (
            <tr key={i}>
              <td>{f.flightNumber}</td>
              <td><strong>{f.origin}</strong> ➝ <strong>{f.destination}</strong></td>
              <td>{f.departureTime.replace("T", " ")} <br />to<br /> {f.arrivalTime.replace("T", " ")}</td>
              <td>${f.price}</td>
            </tr>
          ))}
          {flights.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No flights found</td></tr>
          )}
        </tbody>
      </table>


      <hr style={{ margin: '40px 0' }} />

      <h3>Confirmed Bookings</h3>
      <table width="100%" border="1" cellPadding="10" style={{ borderCollapse: 'collapse', borderColor: '#ccc' }}>
        <thead>
          <tr style={{ background: '#e9e9e9' }}>
            <th>Reference</th>
            <th>Flight</th>
            <th>Passenger</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td>{b.bookingReference}</td>
              <td>{b.flightNumber}</td>
              <td>{b.passengerName}</td>
              <td>{b.origin} ➝ {b.destination}</td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No bookings found</td></tr>
          )}
        </tbody>
      </table>
    </div >
  );
}

export default AdminPanel;
