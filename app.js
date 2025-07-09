require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const { sendEmailWithGmail } = require("./controller/sendEmailController");
const globalErrorHandler = require("./middleware/error-handler");

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API endpoint for sending emails
app.post("/api/send-email", sendEmailWithGmail);

app.use(globalErrorHandler);

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`🚀 Server started at port: ${PORT}...`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
