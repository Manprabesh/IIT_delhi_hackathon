import mongoose from 'mongoose';

const product_schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  product_category: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  product_upload_by: {
    type: String,
    required: true
  },
  product_review: {
    type: String,
    required: true
  },
  product_price: {
    type: String,
    required: true
  },
  product_image_url: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Create the product model
const Product = mongoose.model('Product', product_schema);

export default Product;
