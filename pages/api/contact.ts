import { NextApiHandler } from "next";

interface requestBody {
  email: string;
  name: string;
  message: string;
}

const handler: NextApiHandler = (req, res) => {
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
    const newMessage = {
      email,
      name,
      message,
    };
    console.log(newMessage);
    res
      .status(201)
      .json({ message: "Successfully stored message!", feedback: newMessage });
    //201 successfully stored
  }
};

export default handler;
