package com.Hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.HotelModel.HotelDetails;

@Repository
public interface HotelDetailsRepository extends JpaRepository<HotelDetails, Long>  {

}
