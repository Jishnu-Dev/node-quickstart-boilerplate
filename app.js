//// MONGO RELATED ////
const { MongoClient } = require("mongodb");
const connectionUri =
  "mongodb+srv://jishnusmac:Jishnu003@cluster0.n6ogrqn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionUri);
let data;
async function run() {
  try {
    await client.connect();
    const database = client.db("sample_airbnb");
    const listings = database.collection("listingsAndReviews");
    const query = { property_type: "Apartment" };
    const fields = { name: 1, bedrooms: 1 };
    data = await listings.find(query).project(fields).limit(10).toArray();
    console.log(data);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
// MONGO RELATED

const express = require("express");
// const { logger } = require("./logger");
// const { authorize } = require("./authorize");
const morgan = require("morgan");

const app = express();
// THIRD PARTY AUTHORIZATION
// app.use(morgan("tiny"));
// app.use([authorize, logger]);

// For form
app.use(express.static("./public"));

// FOR url encoded data parsing
app.use(express.urlencoded({ extended: false }));

// FOR PASING JSON DATA
app.use(express.json());

app.listen(5000, () => {
  console.info("Server listening on port 5000...");
});

app.get("/", (req, res) => {
  res.status(200).send("./index.html");
});

// ROUTER CONFIGURED URLS
const listing = require("./routes/listing");
app.use("/listing", listing);

app.get("/auth/middleware", (req, res) => {
  const { method, url } = req;
  res.status(200).send("MIDDLEWARES");
});

app.post("/login-form", (req, res) => {
  const { username, password } = req.body;
  console.log("POST REQUEST::", req.body);
  res.status(200).json(`WELCOME ${username}`);
});

app.post("/api/postman", (req, res) => {
  const { name } = req.body;
  console.log("NAME:", name);
  res.status(200).json({ success: true, data: `The name is ${name}` });
});

app.all("*", (req, res) => {
  res.status(404).send("404");
});

// app.use(express.static("./public")); // To resolve paths of everything in the public folder automatically.
//// PRIMITIVE WAY OF SETTING UP SERVER ////
// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.end("<h1>Hompage</h1>");
//   } else res.end("404");
// });
// server.listen(5000, () => {
//   console.info("Server started, listening on port: 3000");
// });
