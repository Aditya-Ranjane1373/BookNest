package com.Hotel.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Hotel.Service.RoomService;
import com.HotelModel.Room;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Add Room
    @PostMapping("/insert")
    public Room addRoomDetails(@RequestBody Room room) {
        return roomService.addRoom(room);
    }

    // Get All Rooms
    @GetMapping("/get")
    public List<Room> getAllRoomDetails() {
        return roomService.getAllRooms();
    }

    // Get Room by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Room> getRoomDetails(@PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        if (room != null) {
            return ResponseEntity.ok(room);
        }
        return ResponseEntity.notFound().build();
    }

    // Update Room by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Room> updateRoomDetails(@PathVariable Long id, @RequestBody Room room) {
        Room updatedRoom = roomService.updateRoom(id, room);
        if (updatedRoom != null) {
            return ResponseEntity.ok(updatedRoom);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Room by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok("Deleted room with ID: " + id);
    }
}
