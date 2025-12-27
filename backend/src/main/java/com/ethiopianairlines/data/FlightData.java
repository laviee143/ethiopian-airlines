package com.ethiopianairlines.data;

import com.ethiopianairlines.model.Flight;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FlightData {
    private static FlightData instance;
    private List<Flight> flights;

    private FlightData() {
        flights = new ArrayList<>();
        // Mock Data
        flights.add(new Flight("1", "ET302", "ADD", "NBO", "2023-12-01T08:00", "2023-12-01T10:00", 250.00));
        flights.add(new Flight("2", "ET500", "ADD", "IAD", "2023-12-01T10:00", "2023-12-01T20:00", 1200.00));
        flights.add(new Flight("3", "ET700", "LHR", "ADD", "2023-12-02T14:00", "2023-12-02T22:00", 800.00));
        flights.add(new Flight("4", "ET301", "NBO", "ADD", "2023-12-01T18:00", "2023-12-01T20:00", 260.00));
    }

    public static synchronized FlightData getInstance() {
        if (instance == null) {
            instance = new FlightData();
        }
        return instance;
    }

    public List<Flight> searchFlights(String origin, String destination) {
        return flights.stream()
                .filter(f -> f.getOrigin().equalsIgnoreCase(origin) && f.getDestination().equalsIgnoreCase(destination))
                .collect(Collectors.toList());
    }
    
    public List<Flight> getAllFlights() {
        return flights;
    }
    
    public Flight getFlightById(String id) {
        return flights.stream()
                .filter(f -> f.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
