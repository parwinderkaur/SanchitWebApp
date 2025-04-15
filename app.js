const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const session = require("express-session");
const flash = require("connect-flash");

dotenv.config();

const app = express();
const webRoutes = require("./routes/web");
app.use(express.static("public"));


app.use(session({
  secret: "crystalshealingsecretkey",
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Layout Middleware
app.use(expressLayouts);

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected successfully");
}).catch((err) => {
  console.error("❌ DB connection error:", err);
});

// Routes
app.use("/", webRoutes);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
