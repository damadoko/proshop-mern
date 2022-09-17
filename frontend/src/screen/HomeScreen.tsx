import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { selectProducts, setProduct } from "features/product/productSlice";
import { ProductCard } from "components/ProductCard";
import { Loader } from "components/Loader";
import { Message } from "components/Message";

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getProducts = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get("/products");
      dispatch(setProduct(data));
    } catch (error) {
      setError(true);
      console.error(error);
    }

    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <h1>Lasted Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Something when wrong</Message>
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
