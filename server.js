const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tshirt_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Order schema
const OrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  product: String,
  size: String,
  quantity: Number,
  date: { type: Date, default: Date.now }
});

const CartOrderSchema = new mongoose.Schema({
  product: String,
  size: String,
  quantity: Number,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);
const CartOrder = mongoose.model('CartOrder', CartOrderSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.post('/order', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});

app.post('/checkout', async (req, res) => {
  try {
    const orders = req.body.cart.map(item => ({
      product: item.product,
      size: item.size,
      quantity: item.quantity
    }));
    await CartOrder.insertMany(orders);
    res.json({ message: 'Checkout successful! Your cart has been processed.' });
  } catch (error) {
    res.status(500).json({ message: 'Error during checkout', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
