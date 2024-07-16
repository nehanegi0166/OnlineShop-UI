import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Category from "./Category";
import NoMatch from "./NoMatch";
import ProductList from "./Customer";
import styled from "styled-components";
import Customer from "./Customer";
import Admin from "./Admin";

function App() {
  return (
    <div className="container pt-3">
      <BrowserRouter>
        <nav>
          <ul className="d-flex justify-content-start list-unstyled">
            <li className="m-2">
              <StyledLink to="/">Home</StyledLink>
            </li>
            <li className="m-2">
              <StyledLink to="/customer">Customer</StyledLink>
            </li>
            <li className="m-2">
              <StyledLink to="/admin">Admin</StyledLink>
            </li>

            {/* <li className="m-2">
              <StyledLink to="/product">Create Product</StyledLink>
            </li>
            <li className="m-2">
              <StyledLink to="/all-products">All Products</StyledLink>
            </li>
            <li className="m-2">
              <StyledLink to="/category">Category</StyledLink>
            </li> */}
          </ul>
        </nav>
        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />

          {/* <Route path="/product" element={<Product />} />
          <Route path="/all-products" element={<ProductList />}></Route>
          <Route path="/category" element={<Category />} /> */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 10px;

  &:hover {
    color: grey;
    text-decoration: underline;
  }
`;
