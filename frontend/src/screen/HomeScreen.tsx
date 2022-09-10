import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import { selectProducts, setProduct } from "features/product/productSlice";

import { ProductCard } from "../components/ProductCard";

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get("/products");
      dispatch(setProduct(data));
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>Lasted Products</h1>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};
