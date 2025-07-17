import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room, showBook }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/book/${room.id}`);
  };

  return (
    <Card className="shadow-sm h-100">
      {room.imageUrl && (
        <Card.Img
          variant="top"
          src={room.imageUrl}
          alt={room.roomType}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <Card.Body>
        <Card.Title>{room.roomType}</Card.Title>
        <Card.Text>
          ₹{room.price} / night <br />
          Status: {room.available ? "Available" : "Unavailable"}
        </Card.Text>
        {showBook && room.available && (
          <Button variant="primary" onClick={handleBookNow}>
            Book Now
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default RoomCard;
