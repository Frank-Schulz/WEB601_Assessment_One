import { React, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/account");
    }
  }, [ navigate ]);

  return (
    <div className="page landing">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to this random shop</h1>
              <p className="subtitle">For everything you want but nothing you need!</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">Login</Button>
              </a>
              <a href="/Register">
                <Button size="lg" className="landingbutton" variant="info">Register</Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
