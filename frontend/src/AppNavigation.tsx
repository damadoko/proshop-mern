import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomeScreen, ProductScreen } from "./screen";

export const AppNavigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route path="/product/:id" element={<ProductScreen />} />
    </Routes>
  );
};
