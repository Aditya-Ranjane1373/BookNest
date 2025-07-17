package com.Hotel.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelModel.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
	
}