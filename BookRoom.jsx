import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
import './BookRoom.css'; // <-- new CSS file for advanced styles

const BookRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    totalAmount: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!roomId) return;
    axios.get("http://localhost:8082/api/rooms/get")
      .then(res => {
        const selectedRoom = res.data.find(r => r.id === parseInt(roomId));
        if (selectedRoom) {
          setRoom(selectedRoom);
        } else {
          setMessage("Room not found.");
        }
      })
      .catch(() => setMessage("Failed to load room info"));
  }, [roomId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      const orderResponse = await axios.post(`http://localhost:8082/api/payment/create-order/${room.price}`);
      const { id: order_id, amount, currency } = orderResponse.data;

      const options = {
        key: "rzp_test_wpi348bHMGMA3n", // Replace with real key
        amount,
        currency,
        name: "BookNest Hotel",
        description: `Booking for ${room.roomType}`,
        order_id,
        handler: async function (response) {
          try {
            const bookingData = {
              room: { id: room.id },
              customer: { id: user.id },
              checkInDate: formData.checkInDate,
              checkOutDate: formData.checkOutDate,
              totalAmount: room.price,
            };
            await axios.post("http://localhost:8082/api/bookings/insert", bookingData);
            alert("Booking successful!");
            navigate("/mybookings");
          } catch (err) {
            console.error(err);
            setMessage("Payment succeeded but booking failed.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setMessage("Failed to initiate payment.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.checkInDate || !formData.checkOutDate) {
      setMessage("Please fill in all dates.");
      return;
    }
    handlePayment();
  };

  if (!room) return <Spinner animation="border" className="mt-5" />;

  return (
    <Container className="booking-container">
      <Card className="booking-card">
        <Card.Body>
          <h2 className="booking-title">Book Your Stay</h2>
          <p className="booking-subtitle">{room.roomType} - ₹{room.price}</p>
          {message && <Alert variant="danger">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                className="form-input"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                className="form-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="booking-btn w-100">
              Pay & Confirm Booking
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookRoom;
