// server/app.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { db } = require("./firebaseconfig"); // Make sure firebaseconfig.js uses CommonJS too

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));


// Serve HTML files
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));
app.get("/signup.html", (req, res) => res.sendFile(path.join(__dirname, "../public/signup.html")));
app.get("/login.html", (req, res) => res.sendFile(path.join(__dirname, "../public/login.html")));
app.get("/home.html", (req, res) => res.sendFile(path.join(__dirname, "../public/home.html")));
app.get("/admin.html", (req, res) => res.sendFile(path.join(__dirname, "../public/admin.html")));

// Add Event (Admin)
app.post("/add-event", async (req, res) => {
  const { title, description } = req.body;
  try {
    await db.collection("events").add({ title, description, createdAt: new Date() });
    res.status(200).send("Event added successfully");
  } catch (err) {
    res.status(500).send("Error adding event");
  }
});

// Get Events (for index and home)
app.get("/events", async (req, res) => {
  try {
    const snapshot = await db.collection("events").orderBy("createdAt", "desc").get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(events);
  } catch (err) {
    res.status(500).send("Error getting events");
  }
});

// Register for event
app.post("/register-event", async (req, res) => {
  const { name, email, branch, regno, section } = req.body;
  try {
    await db.collection("registrations").add({ name, email, branch, regno, section, time: new Date() });
    res.status(200).send("Registered successfully");
  } catch (err) {
    res.status(500).send("Registration failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
