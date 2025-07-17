import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Alert, Spinner } from "react-bootstrap";
import "./MyBookings.css"; // Custom styles

const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/bookings/user/${user.id}`);
      setBookings(res.data);
    } catch (err) {
      setMessage("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await axios.delete(`http://localhost:8082/api/bookings/${id}`);
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8082/api/bookings/invoice/${id}`, {
        responseType: 'blob',
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Booking_${id}_Invoice.pdf`;
      link.click();
    } catch (err) {
      setMessage("Failed to download invoice.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="my-bookings-bg">
      <Container className="my-bookings-container py-5">
        <h2 className="mb-4 text-center text-uppercase heading-border">My Bookings</h2>
        {message && <Alert variant="danger">{message}</Alert>}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-muted">No bookings found.</p>
        ) : (
          <div className="table-responsive">
            <Table className="booking-table" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Total (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, index) => (
                  <tr key={b.id}>
                    <td>{index + 1}</td>
                    <td>{b.room.roomType}</td>
                    <td>{b.checkInDate}</td>
                    <td>{b.checkOutDate}</td>
                    <td>₹{b.totalAmount.toLocaleString()}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCancel(b.id)}
                        className="me-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleDownload(b.id)}
                      >
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyBookings;
