import axios from 'axios';
import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './../../components/ErrorMessage';
import Loading from './../../components/Loading';

const AddAddress = () => {
  const navigate = useNavigate();

  const [ name, setName ] = useState(null);
  const [ streetName, setStreetName ] = useState(null);
  const [ streetAddress, setStreetAddress ] = useState(null);
  const [ city, setCity ] = useState(null);
  const [ zip, setZip ] = useState(null);
  const [ state, setState ] = useState(null);
  const [ country, setCountry ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError(null);
    // setMessage(null);
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
        { user, name, streetName, streetAddress, city, zip, state, country, },
        config
      );

      setLoading(false);
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/account");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {/* {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
          {/* </Form.Group>
        <Form.Group className="mb-3" controlId="street"> */}
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
          {/* </Form.Group>
        <Form.Group className="mb-3" controlId="city"> */}
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
          />
          {/* </Form.Group>
        <Form.Group className="mb-3" controlId="zip"> */}
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="zip"
            value={zip}
            placeholder="Enter zip"
            onChange={(e) => setZip(e.target.value)}
          />
          {/* </Form.Group>
        <Form.Group className="mb-3" controlId="state"> */}
          <Form.Label>State</Form.Label>
          <Form.Control
            type="state"
            value={state}
            placeholder="Enter state"
            onChange={(e) => setState(e.target.value)}
          />
          {/* </Form.Group>
        <Form.Group className="mb-3" controlId="country"> */}
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="country"
            value={country}
            placeholder="Enter country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Address
        </Button>
      </Form>
    </div>
  )
}

export default AddAddress;
