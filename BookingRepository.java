package com.Hotel.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelModel.Booking;
import com.HotelModel.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer(User customer);
}