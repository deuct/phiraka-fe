import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Login = () => {
  const recaptcha = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userlogin, setUserlogin] = useLocalStorage("userlogin", null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const token = recaptcha.current.getValue();
    recaptcha.current.reset();
    const inputVal = await e.target[0].value;

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/post`, { inputVal, token })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          processLogin();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const processLogin = async () => {
    console.log("here runnig");
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        setUserlogin(username);
        Swal.fire({
          title: "Success",
          text: "Successfully login.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => navigate("/home"));
        console.log(res);
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed login",
          text: "failed try to login.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(error);
      });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="cardlogin mx-auto d-block w-50 mt-5">
              <h4 className="text-center">Login</h4>
              <Form onSubmit={handleLogin} className="cardfaryandra loginform">
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
                <ReCAPTCHA
                  ref={recaptcha}
                  sitekey={process.env.REACT_APP_SITE_KEY}
                />
                <span>
                  Please go to <Link to="/register">register</Link> page if you
                  not have an account
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

export default Login;
