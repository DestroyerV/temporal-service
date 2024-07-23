import express from "express";
import path from "path";
import cors from "cors";

const __dirname = path.resolve();

const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// current date endpoint
app.get("/api", function (req, res) {
  let currentDate = new Date();
  res.json({
    unix: parseInt(currentDate.getTime()),
    utc: currentDate.toUTCString(),
  });
});

// Date endpoint
app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;

  // Check if the input is a number (timestamp)
  if (!isNaN(dateString)) {
    dateString = parseInt(dateString);
  }

  let date = new Date(dateString);

  // Check if the date is valid
  if (!isNaN(date.getTime())) {
    res.json({ unix: parseInt(date.getTime()), utc: date.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
