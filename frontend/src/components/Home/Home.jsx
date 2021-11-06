import React from "react";
import "./Home.css";
import Product from "./Product";
import { CgMouse } from "react-icons/all";

const product = {
  name: "Blue T-shirt",
  images: [
    { url: "https://m.media-amazon.com/images/I/61bDoqhvEPL._UL1500_.jpg" },
  ],
  price: "₹999",
  _id: "1",
};

const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to ECOMMERCE</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
