const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Product = require('./models/products');
const Order = require('./models/order');
const PersonDetail = require('./models/PersonsDetail');
const User = require('./models/Users');
// 1. Initialize App & Middleware
dotenv.config(); // Must be called BEFORE using process.env
const app = express();

app.use(express.json()); 
app.use(cors());         

// 2. Local MongoDB Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/seven_guys_db'; // 127.0.0.1 is more stable than 'localhost'

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Local MongoDB Connected: seven_guys_db"))
  .catch((err) => console.log("❌ Local Connection Error:", err));

// 3. POST Route for your AddProduct Form
app.post('/addproducts', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    console.log("New Product Added:", savedProduct);
    res.status(201).json(savedProduct);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. GET Route to fetch the menu (Pizzas, Burgers, etc.)
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/pizzas", async (req, res) => {
  try {
    const pizzas = await Product.find({ category: "Pizza" });
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});
app.get("/burgers", async (req, res) => {
  try {
    const burgers = await Product.find({ category: "Burger" });
    res.json(burgers);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/deals", async (req, res) => {
  try {
    const deals = await Product.find({ category: "Deals" });
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/drinks", async (req, res) => {
  try {
    const drinks = await Product.find({ category: "Drinks" });
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("7 Guys Backend is Running...");
});

app.delete('/delete_products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});
app.put('/update_product/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.post('/placeorder', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    
    console.log("✅ 7 Guys Order Received:", savedOrder.name);
    res.status(201).json(savedOrder);
  } catch (err) {
    // If name, price, or qty is missing, this catch will trigger
    console.log("❌ Order Error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

app.get('/orders/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product=await Product.findById(productId);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/placeorder', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  } });

app.delete('/deleteorder/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

let orders = [];
app.post('/checkout', async (req, res) => {
  try {
    orders = req.body; // Store the orders in a variable for later retrieval
    res.json({ order: orders });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});
app.post('/persondetails', async (req, res) => {
  try {
    const persondetails = req.body;
    const finaldetails={
      name: persondetails.name,
      email: persondetails.email,
      phone: persondetails.phone,
      payment: persondetails.payment,
      address: persondetails.address,
      orderdetails: orders // Include the orders in the final details
    }
    const savedDetails = await PersonDetail.create(finaldetails);
    console.log("✅ Person Details Saved:", savedDetails.name);
    res.status(201).json(savedDetails);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/deletedetails", async (req, res) => {
  try {
    await PersonDetail.deleteMany({});
    res.json({ message: "All person details deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.get('/persondetails', async (req, res) => {
  try {
    const details = await PersonDetail.find();
    console.log(details);
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  } });


//Signup and Login Routes
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    console.log("New User Signed Up:", savedUser.username);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    console.log("User Logged In:", user.username);
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});