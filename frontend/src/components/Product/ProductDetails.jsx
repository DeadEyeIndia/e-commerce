import React, { useEffect } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((image, i) => (
                <img
                  key={image.url}
                  src={image.url}
                  alt={`${i} Slide`}
                  className="CarouselImage"
                />
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
