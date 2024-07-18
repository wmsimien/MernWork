const express = require("express");

const logger = require("morgan");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = 9000 || process.env.PORT;

const cors = require("cors");

// create Express server
const app = express();

// enable cors at root level
app.use(
  cors({
    origin: ["http://localhost:3000"], // allow origin(s)
    credentials: true, // allowed to send cookies to the origin(s) specified and set cookies
    optionsSuccessStatus: 200,
  })
);

// serve static files
app.use("/static", express.static("public"));

// enable middleware for setting request content type to json in body
app.use(express.json({ limit: "2mb", extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for incoming cookies;
// will parse and put into req.cookies
app.use(cookieParser());

// third-party middleware
app.use(logger("dev"));

//routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/clients", require("./routes/api/clients"));
app.use("/api/vaccines", require("./routes/api/vaccines"));
app.use("/api/healthFacilities", require("./routes/api/healthFacilities"));
app.use("/api/healthFacility", require("./routes/api/healthFacility"));
app.use("/api/appointment", require("./routes/api/appointment"));
app.use("/api/email", require("./routes/api/email"));

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
