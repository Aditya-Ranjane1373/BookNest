package com.Hotel.Service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Hotel.Repository.RoomRepository;
import com.HotelModel.Room;



@Service
public class RoomService {
	
	@Autowired
    private RoomRepository roomRepository;

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room updateRoom(Long id, Room newRoom) {
		Room roomData =	roomRepository.findById(id).orElse(null);
		if(roomData !=null) {
		  return roomRepository.save(newRoom);
		}else {
			 throw new RuntimeException("User not found with id : " +  id);
		}
 }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }
}