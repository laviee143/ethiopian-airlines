import React, { useState } from 'react';
import FlightSearch from './FlightSearch';
import FlightList from './FlightList';
import BookingForm from './BookingForm';

const MOCK_FLIGHTS = [
    { id: "1", flightNumber: "ET302", origin: "ADD", destination: "NBO", departureTime: "2023-12-01T08:00", arrivalTime: "2023-12-01T10:00", price: 250.00 },
    { id: "2", flightNumber: "ET500", origin: "ADD", destination: "IAD", departureTime: "2023-12-01T10:00", arrivalTime: "2023-12-01T20:00", price: 1200.00 },
    { id: "3", flightNumber: "ET700", "origin": "LHR", destination: "ADD", departureTime: "2023-12-02T14:00", arrivalTime: "2023-12-02T22:00", price: 800.00 },
    { id: "4", flightNumber: "ET301", "origin": "NBO", destination: "ADD", departureTime: "2023-12-01T18:00", arrivalTime: "2023-12-01T20:00", price: 260.00 }
];

function Home() {
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [booking, setBooking] = useState(null);

    // Initial load
    React.useEffect(() => {
        searchFlights({});
    }, []);

    const searchFlights = async (criteria) => {
        setBooking(null);
        setSelectedFlight(null);
        try {
            const query = new URLSearchParams(criteria).toString();
            const response = await fetch(`http://localhost:8080/api/search?${query}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            // If we get an empty list from backend, maybe use mock data for demo purposes?
            // The user wants to see "flights added by admin". Real backend would return them.
            // If backend is down, we use MOCK.
            setFlights(data);
        } catch (error) {
            console.warn("Backend search failed, using mock data", error);
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
        <>
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
        </>
    );
}

export default Home;
