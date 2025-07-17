package com.Hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Hotel.Repository.HotelDetailsRepository;
import com.HotelModel.HotelDetails;

@Service
public class HotelDetailsServices {

	@Autowired
    private HotelDetailsRepository HotelRepo;

    public HotelDetails  addHotel(HotelDetails  hotel) {
        return HotelRepo.save(hotel);
    }

    public List<HotelDetails > getAllHotels() {
        return HotelRepo.findAll();
    }

    public HotelDetails  updateHotel(Long id, HotelDetails  newHotel) {
    	HotelDetails  hotel =	HotelRepo.findById(id).orElse(null);
		if(hotel !=null) {
		  return HotelRepo.save(newHotel);
		}else {
			 throw new RuntimeException("User not found with id : " +  id);
		}
 }

    public void deleteHotel(Long id) {
    	HotelRepo.deleteById(id);
    }

}
