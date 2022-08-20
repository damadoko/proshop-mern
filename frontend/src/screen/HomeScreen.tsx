import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProductCard } from "../components/ProductCard";
import products from "../mock/products";

export const HomeScreen: React.FC = () => {
  return (
    <>
      <h1>Lasted Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
