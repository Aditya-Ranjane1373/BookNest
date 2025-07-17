import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import RoomCard from "../components/RoomCard";
import "./Room.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/rooms/get")
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load rooms.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="rooms-container">
      <Container>
        <h2 className="section-title">Available Rooms</h2>

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center my-3">
            {error}
          </Alert>
        )}

        {!loading && !error && rooms.length === 0 && (
          <p className="text-muted text-center">No rooms available at the moment.</p>
        )}

        <Row className="room-grid">
          {rooms.map((room) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              key={room.id}
              className="room-card-col mb-4"
            >
              <RoomCard room={room} showBook={user?.role === "CUSTOMER"} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Rooms;
