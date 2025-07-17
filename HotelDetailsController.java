package com.Hotel.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Hotel.Service.HotelDetailsServices;
import com.HotelModel.HotelDetails;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/hotel")
public class HotelDetailsController {

	@Autowired
    private HotelDetailsServices hotelServices;

    // Add hotel
    @PostMapping("/insert")
    public HotelDetails addHotelDetails(@RequestBody HotelDetails hotel) {
        return hotelServices.addHotel(hotel);
    }

    // Get All Hotels
    @GetMapping("/get")
    public List<HotelDetails> getAllHotelDetails() {
        return hotelServices.getAllHotels();
    }

  

    // Update Hotel by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<HotelDetails> updateHotelDetails(@PathVariable Long id, @RequestBody HotelDetails hotel) {
    	HotelDetails updatedHotel = hotelServices.updateHotel(id, hotel);
        if (updatedHotel != null) {
            return ResponseEntity.ok(updatedHotel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Hotel by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteHotel(@PathVariable Long id) {
    	hotelServices.deleteHotel(id);;
        return ResponseEntity.ok("Deleted room with ID: " + id);
    }
}
