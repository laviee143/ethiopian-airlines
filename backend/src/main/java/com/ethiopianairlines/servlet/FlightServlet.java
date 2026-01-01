package com.ethiopianairlines.servlet;

import com.ethiopianairlines.data.FlightData;
import com.ethiopianairlines.model.Flight;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet("/flights")
public class FlightServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String requestBody = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        Flight newFlight = gson.fromJson(requestBody, Flight.class);

        // Ensure ID is set
        if (newFlight.getId() == null || newFlight.getId().isEmpty()) {
            newFlight = new Flight(
                    java.util.UUID.randomUUID().toString(),
                    newFlight.getFlightNumber(),
                    newFlight.getOrigin(),
                    newFlight.getDestination(),
                    newFlight.getDepartureTime(),
                    newFlight.getArrivalTime(),
                    newFlight.getPrice());
        }

        FlightData.getInstance().addFlight(newFlight);

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(newFlight));
    }
}
