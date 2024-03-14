import { hashPassword } from "../../../../lib/auth";

const { connectToDatabase } = require("../../../../lib/db");

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password, username } = data;

    if (
      !username ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 6
    ) {
      res.status(422).json({
        message: "Invalid Inputs. Password should at least 6 characters long ",
      });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User Exists already" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password);
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      username: username,
    });

    res.status(201).json({ message: "User Created Successfully" });
  }
}

export default handler;
