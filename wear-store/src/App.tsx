import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StorePage from './pages/store'
import ShoppingCartPage from './pages/shoppingCart'
import ProductPage from './pages/productPage'
import MainPage from './pages/mainPage'
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
