package com.ethiopianairlines.servlet;

import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@WebServlet("/book")
public class BookingServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(gson.toJson(com.ethiopianairlines.data.BookingData.getInstance().getAllBookings()));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Read JSON body
        String requestBody = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        BookingRequest bookingRequest = gson.fromJson(requestBody, BookingRequest.class);

        String ref = "ET-" + System.currentTimeMillis();

        // Save to data store
        com.ethiopianairlines.model.Booking newBooking = new com.ethiopianairlines.model.Booking(
                ref,
                bookingRequest.flightId,
                bookingRequest.flightNumber,
                bookingRequest.passengerName,
                bookingRequest.email,
                bookingRequest.origin,
                bookingRequest.destination);
        com.ethiopianairlines.data.BookingData.getInstance().addBooking(newBooking);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Flight booked successfully!");
        response.put("bookingReference", ref);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(gson.toJson(response));
    }

    // Helper class for JSON parsing
    private static class BookingRequest {
        String flightId;
        String flightNumber;
        String passengerName;
        String email;
        String origin;
        String destination;
    }
}
