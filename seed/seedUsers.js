require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  await User.deleteMany();

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "manager", password: "manager123", role: "manager" },
    { username: "employee", password: "employee123", role: "employee" },
  ];

  for (let u of users) {
    u.password = await bcrypt.hash(u.password, 10);
    await User.create(u);
  }

  console.log("Users seeded successfully");
  process.exit();
})();