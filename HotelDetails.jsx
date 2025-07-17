import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Table,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HotelDetails.css";

const HotelDetails = () => {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    phoneNo: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect to login if user is not found
  useEffect(() => {
    if (!user) {
      navigate("/login"); // 🔐 redirect to login
    } else {
      fetchHotels();
    }
  }, []);

  const fetchHotels = () => {
    axios
      .get("http://localhost:8082/api/hotel/get")
      .then((res) => setHotels(res.data))
      .catch(() => setError("Failed to load hotel data."));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, adress, phoneNo, description } = formData;

    if (!name || !adress || !phoneNo || !description) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");

    const url = editId
      ? `http://localhost:8082/api/hotel/update/${editId}`
      : "http://localhost:8082/api/hotel/insert";

    const method = editId ? axios.put : axios.post;

    method(url, formData)
      .then(() => {
        setMessage(editId ? "Hotel updated!" : "Hotel added successfully!");
        setFormData({ name: "", adress: "", phoneNo: "", description: "" });
        setEditId(null);
        fetchHotels();
      })
      .catch(() => setError("Error occurred. Try again."));
  };

  const handleEdit = (hotel) => {
    setFormData({
      name: hotel.name,
      adress: hotel.adress,
      phoneNo: hotel.phoneNo,
      description: hotel.description,
    });
    setEditId(hotel.id);
    setMessage("");
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      axios
        .delete(`http://localhost:8082/api/hotel/delete/${id}`)
        .then(() => {
          setMessage("Hotel deleted successfully!");
          fetchHotels();
        })
        .catch(() => {
          setError("Delete failed. Try again.");
        });
    }
  };

  return (
    <Container className="hotel-container mt-5">
      <h2 className="page-title">🏨 Hotel Details</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Show form only for ADMIN */}
      {user?.role === "ADMIN" && (
        <Form onSubmit={handleSubmit} className="hotel-form mb-5">
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Hotel Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. The Grand Regency"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="adress"
                  value={formData.adress}
                  onChange={handleChange}
                  placeholder="123 City Center, Mumbai"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="9876543210"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Luxury hotel with sea view, 5-star amenities..."
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button type="submit" className="btn-save">
              {editId ? "Update Hotel" : "Add Hotel"}
            </Button>
          </div>
        </Form>
      )}

      {/* Show hotel details table */}
      <div className="table-wrapper">
        <Table bordered hover responsive className="hotel-table">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Description</th>
              {user?.role === "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {hotels.length === 0 ? (
              <tr>
                <td colSpan={user?.role === "ADMIN" ? 6 : 5} className="text-center">
                  No hotel data available.
                </td>
              </tr>
            ) : (
              hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.adress}</td>
                  <td>{hotel.phoneNo}</td>
                  <td>{hotel.description}</td>
                  {user?.role === "ADMIN" && (
                    <td>
                      <Button
                        className="btn-edit me-2"
                        size="sm"
                        onClick={() => handleEdit(hotel)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        className="btn-delete"
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(hotel.id)}
                      >
                        🗑️ Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default HotelDetails;
