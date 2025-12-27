import React from 'react';

const FlightList = ({ flights, onBook }) => {
    if (flights.length === 0) {
        return <div className="card"><p>No flights found.</p></div>;
    }

    return (
        <div className="card">
            <h2>Available Flights</h2>
            {flights.map(flight => (
                <div key={flight.id} className="flight-item">
                    <div className="flight-info">
                        <h3>{flight.flightNumber}</h3>
                        <p>{flight.origin} ➝ {flight.destination}</p>
                        <small>{new Date(flight.departureTime).toLocaleString()} - {new Date(flight.arrivalTime).toLocaleString()}</small>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className="flight-price">${flight.price}</div>
                        <button className="btn btn-secondary" onClick={() => onBook(flight)}>Book Now</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FlightList;
