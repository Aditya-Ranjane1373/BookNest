package com.Hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelModel.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
    User findByEmailAndPassword(String email, String password);
}