import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("submitted");

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
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          Swal.fire({
            title: "Success",
            text: "Successfully register.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/login"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="cardlogin mx-auto d-block w-50 mt-5">
              <h4 className="text-center">Register</h4>
              <Form
                onSubmit={handleRegister}
                className="cardfaryandra loginform"
              >
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
                <span>
                  Please go to <Link to="/login">login</Link> page if you
                  already have an account
                </span>
                <div className="text-center">
                  <Button variant="primary" type="submit" className="mt-2">
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
