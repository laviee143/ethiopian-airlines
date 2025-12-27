import React, { useState } from 'react';
import FlightSearch from './components/FlightSearch';
import FlightList from './components/FlightList';
import BookingForm from './components/BookingForm';

// Mock data in case backend is down
const MOCK_FLIGHTS = [
  { id: "1", flightNumber: "ET302", origin: "ADD", destination: "NBO", departureTime: "2023-12-01T08:00", arrivalTime: "2023-12-01T10:00", price: 250.00 },
  { id: "2", flightNumber: "ET500", origin: "ADD", destination: "IAD", departureTime: "2023-12-01T10:00", arrivalTime: "2023-12-01T20:00", price: 1200.00 },
  { id: "3", flightNumber: "ET700", "origin": "LHR", destination: "ADD", departureTime: "2023-12-02T14:00", arrivalTime: "2023-12-02T22:00", price: 800.00 }
];

function App() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [booking, setBooking] = useState(null);

  const searchFlights = async (criteria) => {
    setBooking(null);
    setSelectedFlight(null);
    try {
      const query = new URLSearchParams(criteria).toString();
      const response = await fetch(`http://localhost:8080/api/search?${query}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.warn("Backend search failed, using mock data", error);
      // Filter mock data
      const filtered = MOCK_FLIGHTS.filter(f =>
        (!criteria.origin || f.origin.toLowerCase().includes(criteria.origin.toLowerCase())) &&
        (!criteria.destination || f.destination.toLowerCase().includes(criteria.destination.toLowerCase()))
      );
      setFlights(filtered);
    }
  };

  const handleBookingSuccess = (result) => {
    setBooking(result);
    alert(`Booking Confirmed! Reference: ${result.bookingReference}`);
  };

  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">
            ✈️ Ethiopian Airlines
          </div>
        </div>
      </header>

      <main className="container">
        {!selectedFlight && !booking && (
          <>
            <FlightSearch onSearch={searchFlights} />
            <br />
            <FlightList flights={flights} onBook={setSelectedFlight} />
          </>
        )}

        {selectedFlight && !booking && (
          <BookingForm
            flight={selectedFlight}
            onCancel={() => setSelectedFlight(null)}
            onSuccess={handleBookingSuccess}
          />
        )}

        {booking && (
          <div className="card" style={{ textAlign: 'center', color: 'green' }}>
            <h2>✅ Booking Successful</h2>
            <p>Reference Number: <strong>{booking.bookingReference}</strong></p>
            <button className="btn btn-primary" onClick={() => { setBooking(null); setSelectedFlight(null); }}>
              Book Another Flight
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
