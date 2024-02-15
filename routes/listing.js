const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  console.log("Query", req.query);
  res.status(200).send(data);
});

router.get("/:propertyId", (req, res) => {
  const { propertyId } = req.params;
  const item = data.find((prop) => prop._id === propertyId);
  if (!item) res.status(404).send("Not found");
  res.status(200).json({ success: true, data: item });
});

module.exports = router;
