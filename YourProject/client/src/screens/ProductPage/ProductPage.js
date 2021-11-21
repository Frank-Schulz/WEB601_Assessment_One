import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { BsCart, BsCartFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from './../../components/ErrorMessage';
import Loading from './../../components/Loading';
import MainScreen from './../../components/MainScreen';
import "./ProductPage.css";


const ProductPage = () => {
  const navigate = useNavigate();

  const [ product, setProduct ] = useState({});
  const [ loading, setLoading ] = useState(null);
  const [ productError, setProductError ] = useState(null);
  const [ editMode, setEditMode ] = useState(false);

  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState(0.00);
  const [ description, setDescription ] = useState('');
  const [ imagePath, setImagePath ] = useState('');
  const [ stock, setStock ] = useState(0);
  const [ live, setLive ] = useState(true);
  const [ unlimited, setUnlimited ] = useState(false);

  const userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo).user : {
    isAdmin: false
  };

  let params = useParams();
  const id = params.id;

  const formatter = new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    minimumFractionDigits: 2
  })

  const fetchProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(`/products/${id}`);

    setProduct(data);

    setName(data.name);
    setPrice(data.price);
    setDescription(data.description);
    setImagePath(data.imagePath);
    setStock(data.stock);
    setLive(data.live);
    setUnlimited(data.unlimited);

    setLoading(null);
  }

  const editProduct = async (e) => {
    e.preventDefault();

    setProductError(null);
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const product = { name, price, description, imagePath, stock, live, unlimited }
      const { data } = await axios.post(`/products/update/${id}`, product, config);

      setProduct(data);

      setEditMode(false);
      setLoading(false);

    } catch (error) {
      setProductError(error.response.data.message);
      setLoading(false);
    }
  }

  const deleteProduct = async (e, id) => {
    e.preventDefault();

    // TODO: Confirm for product deletion

    setProductError(null);
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios.delete(`/products/delete/${id}`, config)
        .then(({ data }) => {
          alert(`"${data.name}" deleted successfully!`);
        });

      setLoading(false);

      navigate('/products')

    } catch (error) {
      setProductError(error.response.data.message);
      setLoading(false);
    }
  }

  const addToCart = () => {
    alert('Not yet implemented!');
  }

  const buyNow = () => {
    alert('Not yet implemented!');
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <MainScreen title="Product Info">
      {loading && <Loading />}
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

      <Container>
        {editMode && <>
          {productError && <ErrorMessage variant="danger">{productError}</ErrorMessage>}
          <Form onSubmit={editProduct}>
            <div className="form-group">
              <div className="form-floating mb-3">
                <input className="form-control" id="floatingName" placeholder="Product name" value={name} data-np-checked="1" onChange={(e) => setName(e.target.value)} />
                <label htmlFor="floatingName">Product Name</label>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input type="text" className="form-control" aria-label="Amount" placeholder="Price" value={price} data-np-checked="1" onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="form-floating mb-3">
                <textarea className="form-control" id="description" placeholder="Description" value={description} rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                <label htmlFor="description" className="form-label">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input className="form-control" id="floatingDesc" placeholder="Image Path" value={imagePath} data-np-checked="1" onChange={(e) => setImagePath(e.target.value)} />
                <label htmlFor="floatingDesc">Image Path</label>
              </div>

              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchUnlimited" data-np-checked="1" checked={unlimited} onChange={(e) => setUnlimited(e.target.checked)} />
                <label className="form-check-label" htmlFor="flexSwitchUnlimited">Set product stock as unlimited</label>
              </div>
              <div className="form-floating mb-3">
                <input className="form-control" id="floatingStock" placeholder="Amount in stock" value={stock} data-np-checked="1" disabled={unlimited} onChange={(e) => setStock(e.target.value)} />
                <label htmlFor="floatingStock">Amount in stock</label>
              </div>

              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" id="flexSwitchLive" data-np-checked="1" checked={live} onChange={(e) => setLive(e.target.checked)} />
                <label className="form-check-label" htmlFor="flexSwitchLive">Set product as live (visible to users)</label>
              </div>

              <Button variant="primary" type="submit">
                Save
              </Button>
              <button type="button" className="btn btn-danger" onClick={() => { setEditMode(false) }}>Cancel</button>
            </div>
          </Form>
        </>}
        {!editMode &&
          <Card>
            <Card.Body>
              <Card.Title className="card-title"><h3>{product.name}</h3></Card.Title>
              <Row>
                <Col className="col-lg-5 col-md-5 col-sm-6">
                  <Image src={product.imagePath}></Image>
                </Col>
                <Col className="col-lg-7 col-md-7 col-sm-6">
                  <h4 className="box-title mt-5">Product description</h4>
                  <p>{product.description}</p>
                  <h2 className="mt-5">
                    {formatter.format(product.price)}
                  </h2>
                  <div style={{ display: 'flex', gap: "0.5em" }}>
                    {userInfo.isAdmin && <button type="button" className="btn btn-danger" onClick={() => { setEditMode(true) }}>Edit</button>}
                    <button type="button" className="btn btn-primary" onClick={addToCart}>
                      <BsCart style={{ fontSize: '20px', bottom: 0 }} />
                    </button>
                    <button type="button" className="btn btn-info" onClick={buyNow}>Buy Now</button>
                    <Button
                      onClick={(e) => deleteProduct(e, product._id)}
                      className="btn btn-danger"
                      style={{
                        // "backgroundColor": "transparent",
                        // "backgroundRepeat": "no-repeat",
                        // "border": "none",
                        // "overflow": "hidden",
                        // "outline": "none",
                        // "padding": 0,
                        "marginLeft": "auto",
                        "color": "var(--bs-dark)"
                      }} >
                      <ImCross style={{ color: 'red', fontSize: '20px', bottom: 0 }} />
                      DELETE
                      <ImCross style={{ color: 'red', fontSize: '20px', bottom: 0 }} />
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        }
      </Container>
    </MainScreen>
  )
}

export default ProductPage;
