import React, { useState } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 5) {
      Swal.fire({
        title: "Failed",
        text: "Password minimum is 5 char long",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    } else if (password.length > 8) {
      Swal.fire({
        title: "Failed",
        text: "Password maximum is 8 char long",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/add`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            title: "Success",
            text: "Successfully add user.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/users"));
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed",
          text: "Failed add user.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(error);
      });
  };
  return (
    <>
      <Container>
        <span>Form Penambahan User</span>
        <hr />
        <Row>
          <Col>
            <Form onSubmit={handleSubmit} className="cardfaryandra loginform">
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => navigate("/users")}
                  className="mt-2 me-2"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="mt-2">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddUser;
