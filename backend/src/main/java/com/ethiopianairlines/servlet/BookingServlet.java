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
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Read JSON body
        String requestBody = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

        // Mock processing
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Flight booked successfully!");
        response.put("bookingReference", "ET-" + System.currentTimeMillis());

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(gson.toJson(response));
    }
}
