import React, { useState } from "react";
import classes from "./contact-form.module.css";

const ContactForm = () => {
  const [formInfo, setFormInfo] = useState({
    email: "",
    name: "",
    message: "",
  });
  const sendMessageHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //optional client side validation
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

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
    </section>
  );
};

export default ContactForm;
