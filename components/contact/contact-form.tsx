import React, { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification, { NotificationStatus } from "../ui/notification";

interface FormInfoModel {
  email: string;
  name: string;
  message: string;
}

async function sendContactData(formInfo: FormInfoModel) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(formInfo),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

type StatusCode = "pending" | "success" | "error";

const ContactForm = () => {
  const [requestStatus, setRequestStatus] = useState<StatusCode | null>();

  const [formInfo, setFormInfo] = useState<FormInfoModel>({
    email: "",
    name: "",
    message: "",
  });

  const [requestError, setRequestError] = useState<string>("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    //optional client side validation
    setRequestStatus("pending");

    try {
      await sendContactData(formInfo);
      setRequestStatus("success");
      setFormInfo({
        email: "",
        name: "",
        message: "",
      });
    } catch (error: any) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  };

  let notification: NotificationStatus | undefined;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Message Sent",
      message: "Your message has been successfully sent!",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h2>How can I help you?</h2>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              value={formInfo.email}
              onChange={(e) =>
                setFormInfo((prevInfo) => ({
                  ...prevInfo,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={formInfo.name}
              onChange={(e) =>
                setFormInfo((prevInfo) => ({
                  ...prevInfo,
                  name: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            id='message'
            rows={5}
            value={formInfo.message}
            required
            onChange={(e) =>
              setFormInfo((prevInfo) => ({
                ...prevInfo,
                message: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification notification={notification} />}
    </section>
  );
};

export default ContactForm;
