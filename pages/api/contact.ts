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

    try {
      client = await MongoClient.connect(
        "mongodb+srv://andrew:SqUMjraDdR4bJb7A@cluster0.uozx1.mongodb.net/text-blog?retryWrites=true&w=majority"
      );
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
