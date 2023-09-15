const express = require('express');
const app = new express();

// Create a list of month names
const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

let loginDetails = [];

app.get("/", (req, res) => {
  res.send("Welcome to the express server");
});

app.get("/loginDetails", (req, res) => {
  res.send(JSON.stringify(loginDetails));
});

app.post("/login/:name", (req, res) => {
  loginDetails.push({ "name": req.params.name, "login_time": new Date() });
  res.send(req.params.name + ", You are logged in!");
});

app.get("/:name", (req, res) => {
  res.send("Hello " + req.params.name);
});

// Add a route to fetch a month based on a number
app.get("/fetchMonth/:num", (req, res) => {
  const num = parseInt(req.params.num);

  if (num >= 1 && num <= 12) {
    // Valid month number, retrieve the month name
    const monthName = months[num - 1];
    res.send(`Month ${num}: ${monthName}`);
  } else {
    // Invalid month number, return an error message
    res.status(400).send("Invalid month number. Please provide a number between 1 and 12.");
  }
});

app.listen(3333, () => {
  console.log(`Listening at http://localhost:3333`);
});