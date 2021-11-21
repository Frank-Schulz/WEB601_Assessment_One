import { React, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from './../../components/ErrorMessage';
import Loading from './../../components/Loading';
import MainScreen from '../../components/MainScreen';
import axios from 'axios';
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo).user : null;

  if (userInfo) {
    navigate("/account");
  }

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ fullName, setFullName ] = useState("");
  // const [ lastName, setLastName ] = useState("");
  const [ DoB, setDoB ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ message, setMessage ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "/users/register",
          { email, password, fullName, DoB, },
          config
        );

        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/account");
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  }

  return (
    <MainScreen title="Register">
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              value={fullName}
              placeholder="Full name"
              onChange={(e) => setFullName(e.target.value)}
            />
            {/* <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              value={lastName}
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            /> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={DoB}
              placeholder="Date of Birth"
              onChange={(e) => setDoB(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          {/* </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword"> */}
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
