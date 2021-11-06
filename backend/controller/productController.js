const Products = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create Product -- ADMIN
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const productItem = await Products.create(req.body);

  res.status(201).send({
    success: true,
    productItem,
  });
});

// Get all Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Products.countDocuments();
  const apiFeature = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let productItems = await apiFeature.query;
  res.status(200).send({
    success: true,
    productItems,
    productCount,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const productDetails = await Products.findById(req.params.id);

  if (!productDetails) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).send({
    success: true,
    productDetails,
  });
});

// Update Product -- ADMIN
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let productItem = await Products.findById(req.params.id);

  if (!productItem) {
    return next(new ErrorHandler("Product not found", 404));
  }

  productItem = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).send({
    success: true,
    productItem,
  });
});

// Delete Product -- ADMIN
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const productItem = await Products.findById(req.params.id);

  if (!productItem) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await productItem.remove();
  res.status(201).send({
    success: true,
    message: "Product Deleted successfully",
  });
});

// Create new review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productID } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Products.findById(productID);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
  }

  let avg = 0;
  product.ratings = product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).send({
    success: true,
  });
});

// Get All reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Products.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).send({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Products.findById(req.query.productID);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => (avg += rev.rating));
  const ratings = avg / reviews.length;

  const numReviews = reviews.length;

  await Products.findByIdAndUpdate(
    req.query.productID,
    {
      reviews,
      ratings,
      numReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).send({
    success: true,
  });
});
