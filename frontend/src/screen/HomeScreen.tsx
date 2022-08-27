import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";

import { Product } from "types/product";
import { ProductCard } from "../components/ProductCard";

export const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const { data } = await Axios.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

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
