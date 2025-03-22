'use client';

import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Context from "../context/StateContext";
import Image from "next/image";
import logo from "../../public/logo2.jpg";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineLink, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HOST_ADDRESS } from '../components/contants';
import ShareToggle from "../components/ShareToggle";

export default function JournalContent({ data, year, volume, issue }) {
  const {
    fbshare,
    twittershare,
    lkdshare,
    copyLink,
    incrementLikes,
    decrementLikes,
    incrementViews,
  } = useContext(Context);
  
  const [liked, setLiked] = useState(false);
  const [currLikes, setCurrLikes] = useState(0);

  useEffect(() => {
    if (data?.likes !== undefined) {
      setCurrLikes(data.likes);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="content">
        <div className="jContainer">
          <div className="jContent">
            <h1>Loading article...</h1>
          </div>
        </div>
      </div>
    );
  }

  function re(text) {
    let pattern = /([1-5])(?=[A-Z])/g;
    let modifiedText = text.replace(pattern, "\n$1");
    return modifiedText;
  }

  const handleLikeButton = () => {
    if (liked) {
      setCurrLikes(prev => prev - 1);
      decrementLikes(data._id);
    } else {
      setCurrLikes(prev => prev + 1);
      incrementLikes(data._id);
    }
    setLiked(!liked);
  };

  const {
    abstract,
    authors,
    title,
    keywords,
    authorDetails,
    firstPage,
    lastPage,
    printISSN,
    onlineISSN,
    doi,
    views,
    _id
  } = data;

  return (
    <div className="content">
      <div className="jContainer">
        <div className="jContent">
          <div className="sec1" style={{ marginBottom: "25px" }}>
            <Image src={logo} alt="Library Herald Logo" width={150} height={50} />
            <p>Library Herald</p>
            <ShareToggle />
          </div>
          <div className="section">
            <h1>{title}</h1>
          </div>
          <div className="section">
            <p>
              Library Herald <br /> Year : {year}, Volume : {volume}, Issue :{" "}
              {issue} <br />
              First page : <b>({firstPage}) </b>
              Last page : <b>({lastPage})</b> <br />
              Print ISSN : {printISSN}. Online ISSN : {onlineISSN}.<br />
              Article DOI : {doi}
            </p>
          </div>
          <div className="section">
            <p style={{ fontWeight: "bold" }}>{title}</p>
          </div>
          <div className="section">
            <p style={{ whiteSpace: "pre-line" }}>
              <span style={{ fontWeight: "bold" }}>{authors}</span>
              {re(authorDetails)}
            </p>
          </div>
          {abstract && (
            <div className="section">
              <p style={{ fontWeight: "bold" }}>Abstract</p>
              <p style={{ textAlign: "justify" }}>{abstract}</p>
            </div>
          )}
          {keywords && (
            <div className="section">
              <p style={{ fontWeight: "bold" }}>Keywords</p>
              <p>{keywords}</p>
            </div>
          )}
          <div id="hori-line" style={{ marginTop: "45px" }} />
          <div className="socials">
            <div className="logos">
              <button onClick={fbshare}>
                <FaFacebookF size={14} />
              </button>
              <button onClick={lkdshare}>
                <FaLinkedinIn />
              </button>
              <button onClick={twittershare}>
                <FaXTwitter />
              </button>
              <button onClick={copyLink}>
                <AiOutlineLink />
              </button>
            </div>
            <Link
              href={`/articles?year=${year}&issue=${issue}&volume=${volume}`}
              className="back-link"
            >
              issue {issue} {year}
            </Link>
          </div>
          <div id="hori-line" />
          <div className="sec3">
            <div>
              <p>{views} views</p>
            </div>
            <div>
              <p>{currLikes}</p>
              <button onClick={()=>handleLikeButton(_id)}>
                {liked ? (
                  <AiFillHeart color="#d52c49" />
                ) : (
                  <AiOutlineHeart color="#d52c49" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
