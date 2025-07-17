package com.Hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Hotel.Repository.BookingRepository;
import com.HotelModel.Booking;
import com.HotelModel.User;

@Service
public class BookingService {

	 @Autowired
	    private BookingRepository bookingRepository;

	    public Booking saveBooking(Booking booking) {
	        return bookingRepository.save(booking);
	    }

	    public List<Booking> getBookingsByUser(User user) {
	        return bookingRepository.findByCustomer(user);
	    }

	    public List<Booking> getAllBookings() {
	        return bookingRepository.findAll();
	    }

	    public void deleteBooking(Long id) {
	        bookingRepository.deleteById(id);
	    }
}
