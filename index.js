import express from "express";
import path from "path";
import cors from "cors";

const __dirname = path.resolve();
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;

  // Check if the input is a number (timestamp)
  if (!isNaN(dateString)) {
    dateString = parseInt(dateString);
  }

  let date = new Date(dateString);

  if (!isNaN(date.getTime())) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
