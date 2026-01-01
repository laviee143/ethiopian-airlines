package com.ethiopianairlines.data;

import com.ethiopianairlines.model.Booking;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class BookingData {
    private static BookingData instance;
    private List<Booking> bookings;

    private BookingData() {
        bookings = new CopyOnWriteArrayList<>();
    }

    public static synchronized BookingData getInstance() {
        if (instance == null) {
            instance = new BookingData();
        }
        return instance;
    }

    public void addBooking(Booking booking) {
        bookings.add(booking);
    }

    public List<Booking> getAllBookings() {
        return new ArrayList<>(bookings);
    }
}
