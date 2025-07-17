package com.Hotel.Controller;


import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Hotel.Service.BookingService;
import com.Hotel.Service.UserService;
import com.HotelModel.Booking;
import com.HotelModel.User;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173/")
public class BookingController {

	 @Autowired
	    private BookingService bookingService;

	    @Autowired
	    private UserService userService;

	    @PostMapping("/insert")
	    public Booking bookRoom(@RequestBody Booking booking) {
	        return bookingService.saveBooking(booking);
	    }

	    @GetMapping("/user/{userId}")
	    public List<Booking> getUserBookings(@PathVariable Long userId) {
	        User user = userService.getUserById(userId);
	        return bookingService.getBookingsByUser(user);
	    }

	    @GetMapping("/get")
	    public List<Booking> getAllBookings() {
	        return bookingService.getAllBookings();
	    }

	    @DeleteMapping("/{id}")
	    public void cancelBooking(@PathVariable Long id) {
	        bookingService.deleteBooking(id);
	    }

	    @GetMapping("/invoice/{id}")
	    public void generatePDF(@PathVariable Long id, HttpServletResponse response) throws IOException {
	        Booking booking = bookingService.getAllBookings().stream()
	                .filter(b -> b.getId().equals(id)).findFirst().orElse(null);

	        if (booking != null) {
	            response.setContentType("application/pdf");
	            response.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
	            PDFGenerator.generateInvoice(response, booking);
	        }
	    }


}