import React, { useEffect } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";

const ProductDetails = ({ match }) => {
  /* const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]); */
  return (
    <>
      <div className="ProductDetails"></div>
      <div>
        {/* <Carousel>
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel> */}
      </div>
    </>
  );
};

export default ProductDetails;
