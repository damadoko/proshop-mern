import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { isNil } from "lodash";

import { Product } from "types/product";
import { Rating } from "components/Rating";
import { selectProducts } from "features/product/productSlice";

export const ProductScreen: React.FC = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);

  const [product, setProduct] = useState<Product | null>(null);

  const getProductById = async (id: string) => {
    const { data } = await axios.get(`/products/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    if (!id) return;

    const storedProduct = products.find(({ _id }) => _id === id);
    if (!isNil(storedProduct)) return setProduct(storedProduct);

    getProductById(id);
  }, [id]);

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
                value={product?.rating ?? 0}
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
