'use client';

import { useContext } from "react";
import Context from "../context/StateContext";
import Button from "../components/Button";
import { HOST_ADDRESS } from "../components/contants";

import styles from "./home.module.css";

const ContactForm = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    message,
    setMessage,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleMessageChange,
  } = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${HOST_ADDRESS}/contact-us`, {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          message,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      
      if (response.ok) {
        alert("Email submission Successful ✓");
      } else {
        throw new Error(`Submission failed with status: ${response.status}`);
      }
    } catch (err) {
      alert("Email submission unsuccessful!");
      console.error(err);
    }

    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className={styles.contactUs}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          required={true}
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <input 
          type="text" 
          required={true} 
          placeholder="Last Name" 
          value={lastName} 
          onChange={handleLastNameChange} 
        />
        <input 
          type="email" 
          required={true} 
          placeholder="Email" 
          value={email} 
          onChange={handleEmailChange} 
        />
        <input 
          type="number" 
          required={true} 
          placeholder="Phone" 
          value={phone} 
          onChange={handlePhoneChange} 
        />
        <textarea
          required={true}
          placeholder="Let us know what you need help with..."
          value={message}
          onChange={handleMessageChange}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button textColor={"white"} buttonText={"Submit"} bgcolor={"#3a54b4"} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 