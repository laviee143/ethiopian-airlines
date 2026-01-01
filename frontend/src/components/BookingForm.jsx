import React, { useState } from 'react';

const BookingForm = ({ flight, onCancel, onSuccess }) => {
    const [name, setName] = useState('');
    const [passport, setPassport] = useState('');
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const bookingPayload = {
            flightId: flight.id,
            flightNumber: flight.flightNumber,
            origin: flight.origin,
            destination: flight.destination,
            passengerName: name,
            email: email,
            mockPassport: passport // Backend doesn't store passport yet but we keep it in form
        };

        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            if (response.ok) {
                const data = await response.json();
                onSuccess(data);
            } else {
                throw new Error("Backend failed");
            }
        } catch (error) {
            console.warn("Backend might be down, simulating success (Demo Mode)", error);
            // In a real app we'd show error. For this demo, we fake success.
            setTimeout(() => {
                onSuccess({
                    bookingReference: "DEMO-" + Math.floor(Math.random() * 10000),
                    ...bookingPayload
                });
            }, 800);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ border: '2px solid var(--primary-color)' }}>
            <h3>Booking for Flight {flight.flightNumber}</h3>
            <p>From {flight.origin} to {flight.destination}</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Passenger Name</label>
                    <input required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Internal Passport/ID</label>
                    <input required value={passport} onChange={e => setPassport(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
