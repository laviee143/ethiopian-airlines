package com.ethiopianairlines.model;

public class Booking {
    private String bookingReference;
    private String flightId;
    private String flightNumber;
    private String passengerName;
    private String email;
    private String origin;
    private String destination;

    public Booking(String bookingReference, String flightId, String flightNumber,
            String passengerName, String email, String origin, String destination) {
        this.bookingReference = bookingReference;
        this.flightId = flightId;
        this.flightNumber = flightNumber;
        this.passengerName = passengerName;
        this.email = email;
        this.origin = origin;
        this.destination = destination;
    }

    public String getBookingReference() {
        return bookingReference;
    }

    public String getFlightId() {
        return flightId;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public String getEmail() {
        return email;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDestination() {
        return destination;
    }
}
