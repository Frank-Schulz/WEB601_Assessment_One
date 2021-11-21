import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import ErrorMessage from './../../components/ErrorMessage';
import Loading from './../../components/Loading';
import "./ProfilePage.css";


const ProfilePage = () => { // TODO: redirect if not logged in
  const navigate = useNavigate();

  const [ userInfo, setUserInfo ] = useState(localStorage.userInfo ?
    JSON.parse(localStorage.userInfo).user : '');

  const [ fullName, setFullName ] = useState(userInfo ? userInfo.fullName : '');
  const [ email, setEmail ] = useState(userInfo ? userInfo.email : '');
  const [ detailsError, setDetailsError ] = useState(null);

  const [ addressName, setAddressName ] = useState('');
  const [ streetName, setStreetName ] = useState('');
  const [ streetAddress, setStreetAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ zip, setZip ] = useState('');
  const [ state, setState ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ loading, setLoading ] = useState(null);

  const [ addressError, setAddressError ] = useState(null);

  const addAddress = async (e) => {
    e.preventDefault();

    setAddressError(null);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const user = JSON.parse(localStorage.userInfo).user;

      const { data } = await axios.post(
        "/users/account/address",
        { user, addressName, streetName, streetAddress, city, zip, state, country, },
        config
      );

      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(JSON.parse(localStorage.userInfo).user);

      setAddressName('')
      setStreetName('')
      setStreetAddress('')
      setCity('')
      setZip('')
      setState('')
      setCountry('')

      setLoading(false);
    } catch (addressError) {
      setAddressError(addressError.response.data.message);
      setLoading(false);
    }
  }

  const updateUserDetails = async (e) => {
    e.preventDefault();

    setDetailsError(null);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "/users/account/editDetails",
        { userInfo, fullName, email, },
        config
      );

      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(localStorage.userInfo ?
        JSON.parse(localStorage.userInfo).user : '');

      setLoading(false);
    } catch (addressError) {
      setDetailsError(addressError.response.data.message);
      setLoading(false);
    }
  }

  const deleteAddress = async (e, addressName) => {
    e.preventDefault();
    setDetailsError(null);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const userEmail = JSON.parse(localStorage.userInfo).user.email;

      const { data } = await axios.post(
        "/users/account/deleteAddress",
        { userEmail, addressName, },
        config
      );

      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(JSON.parse(localStorage.userInfo).user);
    } catch (addressError) {
      setDetailsError(addressError.response.data.message);
    }
  }

  const deleteAccount = async (e, email) => {
    e.preventDefault();
    setDetailsError(null);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios.post(
        "/users/account/delete",
        { email },
        config
      )
        .then(({ data }) => {
          alert(`Successfully deleted account belonging to: "${data}"!`);
        });

      await axios.post('/users/logout')
        .then(() => {
          localStorage.removeItem("userInfo");
          navigate("/");
        });

    } catch (accountError) {
      setDetailsError(accountError.response.data.message);
    }
  }

  return (
    <MainScreen title={`${userInfo.isAdmin ? 'Admin' : 'User'} Profile`}>
      <Row className="mb-3">
        <Col>
          {detailsError && <ErrorMessage variant="danger">{detailsError}</ErrorMessage>}
          <legend>User Details</legend>
          <Form onSubmit={updateUserDetails}>
            <Form.Group className="mb-3" controlId="userDetails">
              <Form.Label>Change name</Form.Label>
              <Form.Control
                type="name"
                value={fullName}
                placeholder={userInfo.fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Form.Label>Change email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder={userInfo.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>

          <legend>Saved Addresses</legend>
          <div className="addresses">
            {userInfo && userInfo.addresses && userInfo.addresses.map((address) => (
              <Card style={{ width: '20rem' }} key={address._id}>
                <Card.Body>
                  <Row>
                    <Col>
                      <h5>{address.name}</h5>
                    </Col>
                    <Col>
                      <div style={{ "float": "right" }}>
                        <Button
                          onClick={(e) => deleteAddress(e, address.name)}
                          style={{
                            "backgroundColor": "transparent",
                            "backgroundRepeat": "no-repeat",
                            "border": "none",
                            "overflow": "hidden",
                            "outline": "none",
                            "padding": 0
                          }} >
                          <ImCross style={{ color: 'red', fontSize: '20px', bottom: 0 }} />
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <Card.Text>
                    {address.streetName}{address.streetAddress ? `, ${address.streetAddress}` : false}
                  </Card.Text>
                  <Card.Text>
                    {address.city} {address.zip}
                  </Card.Text>
                  <Card.Text>
                    {address.state}
                  </Card.Text>
                  <Card.Text>
                    {address.country}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
        <Col>
          {addressError && <ErrorMessage variant="danger">{addressError}</ErrorMessage>}
          <legend>Add Address</legend>
          {loading && <Loading size="20" />}
          {!loading && <Form onSubmit={addAddress}>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address name</Form.Label>
              <Form.Control
                type="name"
                value={addressName}
                placeholder="Enter name"
                onChange={(e) => setAddressName(e.target.value)}
              />
              <Form.Label>Street name</Form.Label>
              <Form.Control
                type="streetName"
                value={streetName}
                placeholder="Enter street name"
                onChange={(e) => setStreetName(e.target.value)}
              />
              <Form.Label>Street address</Form.Label>
              <Form.Control
                type="streetAddress"
                value={streetAddress}
                placeholder="Enter street address"
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Form.Label>City</Form.Label>
              <Form.Control
                type="city"
                value={city}
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
              />
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="zip"
                value={zip}
                placeholder="Enter zip"
                onChange={(e) => setZip(e.target.value)}
              />
              <Form.Label>State</Form.Label>
              <Form.Control
                type="state"
                value={state}
                placeholder="Enter state"
                onChange={(e) => setState(e.target.value)}
              />
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="country"
                value={country}
                placeholder="Enter country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Button variant="info" type="submit">
              Add Address
            </Button>
          </Form>}
        </Col>
      </Row>
      <Row className="mt-3">
        <div className="justify-content-center" style={{ display: 'flex' }}>
          <div>
            <Button onClick={(e) => { deleteAccount(e, userInfo.email) }} className="btn btn-danger" style={{ width: '10em', margin: 'auto' }}>
              Delete Account
            </Button>
          </div>
        </div>
      </Row>

    </MainScreen>
  )
}

export default ProfilePage;
