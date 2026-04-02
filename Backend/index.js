const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Product = require("./models/products");
const Order = require("./models/order");
const PersonDetail = require("./models/PersonsDetail");
const User = require("./models/Users");
const sendOrderEmail = require("./models/mailer");

// 1. Initialize App & Middleware
dotenv.config(); // Must be called BEFORE using process.env
const app = express();

app.use(express.json());
app.use(cors());

// 2. Local MongoDB Connection
const MONGO_URI = "mongodb://127.0.0.1:27017/seven_guys_db"; // 127.0.0.1 is more stable than 'localhost'

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Local MongoDB Connected: seven_guys_db"))
  .catch((err) => console.log("❌ Local Connection Error:", err));

// 3. POST Route for your AddProduct Form
app.post("/addproducts", async (req, res) => {
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
app.get("/products", async (req, res) => {
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

app.get("/", (req, res) => {
  res.send("7 Guys Backend is Running...");
});

app.delete("/delete_products/:id", async (req, res) => {
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
app.put("/update_product/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/products/:id", async (req, res) => {
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

app.post("/placeorder", async (req, res) => {
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

app.get("/orders/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/placeorder", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/deleteorder/:id", async (req, res) => {
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
app.post("/checkout", async (req, res) => {
  try {
    orders = req.body; // Store the orders in a variable for later retrieval
    res.json({ order: orders });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});
 // 1. Import your email utility

app.post("/persondetails", async (req, res) => {
  try {
    const { name, email, phone, payment, address } = req.body;
    
    // Note: Ensure 'orders' is defined (likely from your global variable or a previous fetch)
    let newPerson = {
      name: name,
      email: email,
      phone: phone,
      payment: payment,
      address: address,
      orderdetails: orders 
    };

    const personDetail = new PersonDetail(newPerson);
    const savedPersonDetail = await personDetail.save();
    
    console.log("✅ Person details saved:", savedPersonDetail.name);

    // --- 2. TRIGGER THE EMAIL HERE ---
    // We pass the email, name, and the array of items (orders)
    // try {
    //   await sendOrderEmail(email, name, orders);
    //   console.log("📧 Confirmation email sent to:", email);
    // } catch (mailErr) {
    //   // We log the error but don't stop the response 
    //   // so the user still sees their order was successful
    //   console.log("⚠️ Email failed to send, but order was saved:", mailErr.message);
    // }

    // 3. Clear the collection
    await Order.deleteMany({}); 
    
    res.status(201).json(savedPersonDetail);
  } catch (err) {
    console.log("❌ Person details error:", err.message);
    res.status(400).json({ error: err.message });
  }
});



app.get("/persondetails", async (req, res) => {
  try {
    await PersonDetail.deleteMany({});
    res.json({ message: "All person details deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// app.get("/persondetails", async (req, res) => {
//   try {
//     const details = await PersonDetail.find();
//     console.log(details);
//     res.json(details);
//   } catch (err) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

//Signup and Login Routes
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    console.log("New User Signed Up:", savedUser.name);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

let loggedInUser = null; // Variable to store the currently logged-in user

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    loggedInUser = user; // Store the logged-in user in the variable
    console.log(loggedInUser);
    console.log("User Logged In:", user.name);
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/loggedinuser", async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Search for all entries in PersonDetail for this email
    const personEntries = await PersonDetail.find({ email: email });

    if (personEntries.length > 0) {
      // Create a base object using the data from the first entry
      const combinedUser = {
        name: personEntries[0].name,
        email: personEntries[0].email,
        phone: personEntries[0].phone,
        address: personEntries[0].address,
        payment: personEntries[0].payment,
        // Combine all orderdetails arrays from all found documents into one flat array
        orderdetails: personEntries.reduce((acc, curr) => {
          return acc.concat(curr.orderdetails || []);
        }, [])
      };

      return res.json(combinedUser);
    }

    // 2. If no PersonDetail found, check User collection
    const userBase = await User.findOne({ email: email });
    
    if (userBase) {
      return res.json(userBase);
    }

    // 3. If neither has data
    res.status(404).json({ error: "No user data found" });

  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getorders", async (req, res) => {
  try{
    let orders = await PersonDetail.find({});
    res.json(orders)
  }catch(err){
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.put("/updateorder/:id", async (req, res) => {
  try {
    const orderId = req.params.id; // This is the ID of the Person/Order Document
    const { status, orderids, userStatus } = req.body; // orderids should be an array of IDs

    console.log("Updating New Status:", status);
    console.log("Product IDs to Update:", orderids);
    console.log("User Status:", userStatus);

    // 1. Update the status inside the PersonDetail's orderdetails array
    // We use arrayFilters to update every element in the array whose _id is in our list
    const personUpdatePromise = PersonDetail.findOneAndUpdate(
      { _id: orderId }, 
      { $set: { "orderdetails.$[elem].status": status, "userStatus": userStatus } }, 
      { 
        arrayFilters: [{ "elem._id": { $in: orderids } }], 
        new: true 
      }
    );

    // 2. Update the separate Order collection (if you have one)
    const orderUpdatePromise = Order.updateMany(
      { _id: { $in: orderids } }, 
      { $set: { status: status } }
    );

    // Run both updates in parallel
    const [updatedPerson, updateReport] = await Promise.all([
      personUpdatePromise,
      orderUpdatePromise
    ]);

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person or Order not found" });
    }

    // Send ONLY ONE response back to the frontend
    res.json({
      message: "Successfully updated all items",
      updatedPerson,
      count: updateReport.modifiedCount
    });

  } catch (error) {
    console.error("Update Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
app.delete("/deluser", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});
