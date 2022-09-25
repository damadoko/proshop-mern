import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Message } from "components/Message";
import {
  updateItemQuantityInCart,
  selectCartState,
} from "features/product/cartSlice";
import { useAppDispatch, useAppSelector } from "store";

export const CartScreen: React.FC = () => {
  const {
    cart: { cartItems },
  } = useAppSelector(selectCartState);
  const dispatch = useAppDispatch();

  const removeFromCart = (id: string) => {
    console.log(id);
  };

  const subTotal = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
    .toFixed(2);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to={"/"}>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>{item.price}</Col>

                  <Col md={2}>
                    <Form.Select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateItemQuantityInCart({
                            ...item,
                            quantity: Number(e.target.value),
                          })
                        )
                      }
                    >
                      {[...Array(item?.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({subTotal}) items</h2>
              {totalPrice}$
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
