package com.HotelModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Room {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private String roomNumber;
    private String roomType; // Single, Double, Deluxe
    private double price;
    private boolean available;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public Room() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	 @Override
		public String toString() {
			return "Room [id=" + id + ", roomNumber=" + roomNumber + ", roomType=" + roomType + ", price=" + price
					+ ", available=" + available + ", imageUrl=" + imageUrl + "]";
		}
	 
	
}
