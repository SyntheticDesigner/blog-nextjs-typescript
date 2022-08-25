import { NextApiHandler } from "next";
import { MongoClient, Db } from "mongodb";

interface requestBody {
  email: string;
  name: string;
  message: string;
  id?: string;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message }: requestBody = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }
    const newMessage: requestBody = {
      email,
      name,
      message,
    };

    let client: MongoClient;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.uozx1.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database!" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("message").insertOne(newMessage);
      newMessage.id = JSON.stringify(result.insertedId);
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed" });
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", feedback: newMessage });
    //201 successfully stored
  }
};

export default handler;
