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
import java.util.List;

@WebServlet("/search")
public class FlightSearchServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String origin = req.getParameter("origin");
        String destination = req.getParameter("destination");

        List<Flight> results;
        if (origin != null && destination != null) {
            results = FlightData.getInstance().searchFlights(origin, destination);
        } else {
            results = FlightData.getInstance().getAllFlights();
        }

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(gson.toJson(results));
    }
}
