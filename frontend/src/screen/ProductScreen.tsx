import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

import { Product } from "types/product";
import { Rating } from "components/Rating";

export const ProductScreen: React.FC = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  const getProductById = async (id: string) => {
    const { data } = await Axios.get(`/products/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    if (!id) return;
    getProductById(id);
  }, [id]);

  // const product = find<Product>(propEq("_id", id))(products);

  return (
    <>
      <Link to="/">
        <Button variant="link">Go back</Button>
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>

            <ListGroup.Item>
              Description: ${product?.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>{product?.price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {(product?.countInStock ?? 0) > 0
                      ? "In stock"
                      : "Out of stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  disabled={(product?.countInStock ?? 0) === 0}
                  variant="primary"
                  className="btn-block"
                  type="button"
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
