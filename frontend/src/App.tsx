import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppNavigation } from "./AppNavigation";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <AppNavigation />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
