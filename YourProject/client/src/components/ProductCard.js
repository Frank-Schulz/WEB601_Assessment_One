import { React, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { BsCart, BsCartFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";

const ProductCard = ({ userInfo, product, cart }) => {
  const [ inCart, setInCart ] = useState(false);

  const addToCart = async (product) => {
    // setInCart(true);
    if (!userInfo) {
      alert("Please log in to add items to your cart");
      return
    }
    alert("Not yet implemented")
  }

  return (
    <>
      <div style={{ height: "216px", overflow: "hidden" }}>
        <Card.Img variant="top" src={product.imagePath} />
      </div>
      <div style={{ display: "flex", position: "absolute", top: "216px" }}>
        {product.unlimited && <span className="badge bg-success">Unlimited Stock</span>}
        {!product.live && <span className="badge bg-danger">Not live</span>}
      </div>
      <Card.Body>
        <Card.Title style={{ minHeight: "48px" }}>{product.name}</Card.Title>
        <Card.Text>
          {`${product.description.substring(0, 70)}...`}
        </Card.Text>
        <div>
          <Button
            onClick={() => addToCart(product._id)}
            style={{
              "backgroundColor": "transparent",
              "backgroundRepeat": "no-repeat",
              "border": "none",
              "overflow": "hidden",
              "outline": "none",
              "padding": 0
            }} >
            {inCart ? (
              <BsCartFill style={{ color: '#41d7a7', fontSize: '20px', bottom: 0 }} />
            ) : (
              <BsCart onClick={addToCart} style={{ color: '#41d7a7', fontSize: '20px', bottom: 0 }} />
            )}
          </Button>
          <div style={{ "float": "right", height: "20px", "marginTop": "5px" }}>
            <a
              href={`/products/${product._id}`}
              className='orange-text d-flex justify-content-end align-items-center'
            >
              <h6 style={{ margin: 0 }}>
                Read more <FaChevronRight />
              </h6>
            </a>
          </div>
        </div>
      </Card.Body>
    </>
  )
}

export default ProductCard;
