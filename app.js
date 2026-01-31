require("dotenv").config();
require("./config/db");
const User = require("./models/user");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

// View engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(async (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  // ALWAYS fetch user from session
  if (req.session.userId) {
    try {
      res.locals.currentUser = await User.findById(req.session.userId);
    } catch (err) {
      res.locals.currentUser = null;
    }
  } else {
    res.locals.currentUser = null;
  }

  next();
});

app.get("/", (req, res) => {
  res.redirect("/login");
});

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/api", require("./routes/productApiRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);