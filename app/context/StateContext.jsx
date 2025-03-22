'use client';

import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  Children,
} from "react";
import { HOST_ADDRESS } from '../components/contants';
const Context = createContext();    

export const StateContext = ({ children }) => {
  const fbshare = () => {
    const link = window.location.href;
    const msg = encodeURIComponent("Check this blog from Library Herald");
    window.open(`https://www.facebook.com/share.php?u=${link}`, "_blank");
  };
  const twittershare = () => {
    const link = window.location.href;
    const msg = encodeURIComponent("Check this blog from Library Herald");
    window.open(
      `https://www.twitter.com/share?url=${link}&text=${msg}`,
      "_blank"
    );
  };
  const lkdshare = () => {
    const link = window.location.href;
    const msg = encodeURIComponent("Check this blog from Library Herald");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
      "_blank"
    );
  };

  const copyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    alert("Link Copied");
    setSharepopup(false);
  };

  const [option, SetOption] = useState(false);
  const [sharepopup, setSharepopup] = useState(false);
  const handleSharepopup = () => {
    setSharepopup(true);
    SetOption(false);
  };

  //contact us
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // likes and views

  const incrementLikes = (id) => {
    try {
      fetch(`${HOST_ADDRESS}/incrementLikes`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    } catch (error) {
      console.log("Error in liking", error);
    }
  };

  const decrementLikes = (id) => {
    try {
      fetch(`${HOST_ADDRESS}/decrementLikes`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {
      console.log("Error in Dliking", error);
    }
  };
  const incrementViews = (id) => {
    try {
      fetch(`${HOST_ADDRESS}/incrementViews`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {
      console.log("Error in viewsupgrade", error);
    }
  };

  return (
    <Context.Provider
      value={{
        fbshare,
        twittershare,
        lkdshare,
        option,
        SetOption,
        sharepopup,
        setSharepopup,
        copyLink,
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
        incrementLikes,
        decrementLikes,
        incrementViews,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
