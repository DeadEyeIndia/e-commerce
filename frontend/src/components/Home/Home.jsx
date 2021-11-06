import React, { useEffect } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/all";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
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
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

/* const product = {
  name: "Blue T-shirt",
  images: [
    { url: "https://m.media-amazon.com/images/I/61bDoqhvEPL._UL1500_.jpg" },
  ],
  price: "₹999",
  _id: "1",
}; */
