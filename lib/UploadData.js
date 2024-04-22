const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Construct MongoDB connection URI using environment variables
const uri = `mongodb+srv://Ahmed:a123456789@cluster0.8u3eoux.mongodb.net/the-reiewer?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB collection name
const collectionName = "main";

// Path to your JSON file
const filePath = path.resolve(__dirname, "./DBFullData.json");

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    // Select the database and collection
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection(collectionName);

    // Read the JSON file
    const fileContent = fs.readFileSync(filePath, "utf8");
    const posts = JSON.parse(fileContent);

    // Insert posts into the collection
    const result = await collection.insertMany(posts);
    console.log(`${result.insertedCount} posts were inserted`);
  } catch (error) {
    console.error("Error while inserting posts:", error);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);
