import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Tabs,
  Tab,
  Table,
  Button,
  Form,
  Modal,
  Alert,
  Image,
  Row,
  Col,
} from 'react-bootstrap';

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    price: '',
    imageUrl: '',
    available: true
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRooms();
    fetchBookings();
    fetchCustomers();
  }, []);

  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:8082/api/rooms/get");
    setRooms(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:8082/api/bookings/get");
    setBookings(res.data);
  };

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:8082/api/auth/get/user");
    const customerList = res.data.filter(user => user.role === 'CUSTOMER');
    setCustomers(customerList);
  };

  const handleRoomEdit = (room) => {
    setEditRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      price: room.price,
      imageUrl: room.imageUrl || '',
      available: room.available
    });
    setShowRoomModal(true);
  };

  const handleRoomDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await axios.delete(`http://localhost:8082/api/rooms/delete/${id}`);
      fetchRooms();
    }
  };

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRoom) {
        await axios.put(`http://localhost:8082/api/rooms/update/${editRoom.id}`, formData);
        setMessage("Room updated successfully.");
      } else {
        await axios.post("http://localhost:8082/api/rooms/insert", formData);
        setMessage("Room added successfully.");
      }
      setShowRoomModal(false);
      setEditRoom(null);
      setFormData({ roomNumber: '', roomType: '', price: '', imageUrl: '', available: true });
      fetchRooms();
    } catch (err) {
      setMessage("Failed to save room.");
    }
  };

  return (
    <Container className="mt-5 bg-white p-4 rounded shadow-sm">
      <h2 className="mb-4 border-bottom pb-2">📊 Admin Dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}

      <Tabs defaultActiveKey="rooms" className="mb-3" fill>
        {/* === ROOMS === */}
        <Tab eventKey="rooms" title="Manage Rooms">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Room List</h5>
            <Button variant="primary" onClick={() => setShowRoomModal(true)}>+ Add Room</Button>
          </div>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Room No.</th>
                <th>Type</th>
                <th>Price</th>
                <th>Image</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>₹{room.price}</td>
                  <td>
                    {room.imageUrl ? (
                      <Image src={room.imageUrl} alt="Room" width={60} height={40} thumbnail />
                    ) : 'N/A'}
                  </td>
                  <td>
                    <span className={`badge ${room.available ? 'bg-success' : 'bg-danger'}`}>
                      {room.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-secondary" onClick={() => handleRoomEdit(room)}>
                      Edit
                    </Button>{' '}
                    <Button size="sm" variant="outline-danger" onClick={() => handleRoomDelete(room.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* === BOOKINGS === */}
        <Tab eventKey="bookings" title="All Bookings">
          <h5 className="mt-3 mb-3">Booking History</h5>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={b.id}>
                  <td>{index + 1}</td>
                  <td>{b.customer.name}</td>
                  <td>{b.room.roomType}</td>
                  <td>{b.checkInDate} to {b.checkOutDate}</td>
                  <td>₹{b.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* === CUSTOMERS === */}
        <Tab eventKey="customers" title="Customers">
          <h5 className="mt-3 mb-3">Registered Customers</h5>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {/* === Room Modal === */}
      <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editRoom ? "Edit Room" : "Add Room"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRoomSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Room Type</Form.Label>
              <Form.Control
                type="text"
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/room.jpg"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              {editRoom ? "Update Room" : "Add Room"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
