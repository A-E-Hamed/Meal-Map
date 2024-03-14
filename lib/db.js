import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.8u3eoux.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`;

  const client = await MongoClient.connect(connectionString);
  return client;
}
