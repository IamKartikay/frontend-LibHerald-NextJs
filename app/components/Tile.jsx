'use client';

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import styles from "../styles/tile.module.css";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineLink, AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import Context from "../context/StateContext";
import { useEffect } from "react";

const Tile = (props) => {
  const {
    fbshare,
    twittershare,
    lkdshare,
    copyLink,
    incrementLikes,
    decrementLikes,
    incrementViews,
  } = useContext(Context);

  //Component-Level State:
  const [option, SetOption] = useState(false);
  const [sharepopup, setSharepopup] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currLikes, setcurrLikes] = useState(null);

  const router = useRouter();

  const {
    _id,
    firstPage,
    lastPage,
    printISSN,
    title,
    onlineISSN,
    doi,
    views,
    likes,
  } = props.data;

  useEffect(() => {
    setcurrLikes(likes);
  }, [likes]);

  const { year, volume, issue } = props;

  const handleLikeButton = () => {
    if (liked) {
      setcurrLikes(currLikes => currLikes-1);
      decrementLikes(_id);
    } else {
      setcurrLikes(currLikes => currLikes+1);
      incrementLikes(_id);
    }
    setLiked(!liked);
  };

  return (
    <>
      <Dialog
        open={sharepopup}
        onClose={() => setSharepopup(!sharepopup)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          {"Share Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-around",
                marginBottom: "30px",
              }}
            >
              <button
                onClick={fbshare}
                style={{
                  background: "#4464a3",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              >
                <FaFacebookF size={30} color="white" />
              </button>
              <button
                onClick={twittershare}
                style={{
                  background: "#55acee",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              >
                <FaXTwitter size={30} color="white" />
              </button>
              <button
                onClick={lkdshare}
                style={{
                  background: "#0077b5",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              >
                <FaLinkedinIn size={30} color="white" />
              </button>
              <button
                onClick={copyLink}
                style={{
                  background: "#333333",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              >
                <AiOutlineLink size={30} color="white" />
              </button>
            </span>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <article className={styles.tile}>
        <div className={styles.sec1}>
          <Image 
            src="/logo2.jpg" 
            alt="Library Herald Logo" 
            width={30} 
            height={30}
            priority
          />
          <p>Library Herald</p>

          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              SetOption(!option);
            }}
            aria-label="More options"
          >
            <BsThreeDotsVertical />
          </button>
          {option && (
            <button
              className={styles.option}
              onClick={() => {
                setSharepopup(!sharepopup);
                SetOption(false);
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginLeft: "25px",
                }}
              >
                <PiShareFatLight /> Share Post
              </span>
            </button>
          )}
        </div>

        <div
          className={styles.sec2}
          onClick={() => {
            incrementViews(_id);
            router.push(
              `/article/${_id}?year=${year}&issue=${issue}&volume=${volume}`
            );
          }}
          role="button"
          tabIndex={0}
        >
          <p style={{ fontSize: "13px" }}>
            issue{props.issue} {props.year}
          </p>
          <p className={styles.title}>{title}</p>
          <p style={{ fontSize: "12.5px", marginTop: "2%" }}>
            Library Herald
            <br />
            First page : ({firstPage}) Last page : ({lastPage})<br />
            Print ISSN : {printISSN}. Online ISSN : {onlineISSN}.<br />
            Article DOI : {doi}
          </p>
        </div>
        <div className={styles.horiLine} />
        <div className={styles.sec3}>
          <div>
            <IoEyeOutline />{" "}
            <p>{views}</p>
          </div>
          <div>
            <p>{currLikes}</p>
            <button 
              onClick={handleLikeButton}
              aria-label={liked ? "Unlike article" : "Like article"}
            >
              {liked ? (
                <AiFillHeart color="#d52c49"/>
              ) : (
                <AiOutlineHeart color="#d52c49"/>
              )}
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default Tile;

// Below is from v0

/*
"use client"

import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BsThreeDotsVertical } from "react-icons/bs"
import { PiShareFatLight } from "react-icons/pi"
import styles from "../../styles/tile.module.css"
import Image from "next/image"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { AiOutlineLink, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { IoEyeOutline } from "react-icons/io5"
import Context from "../context/StateContext"

const Tile = (props) => {
  const { fbshare, twittershare, lkdshare, copyLink, incrementLikes, decrementLikes, incrementViews } =
    useContext(Context)

  // Component-Level State:
  const [option, setOption] = useState(false)
  const [sharepopup, setSharepopup] = useState(false)
  const [liked, setLiked] = useState(false)
  const [currLikes, setCurrLikes] = useState(null)

  const router = useRouter()

  const { _id, firstPage, lastPage, printISSN, title, onlineISSN, doi, views, likes } = props.data

  useEffect(() => {
    setCurrLikes(likes)
  }, [likes])

  const { year, volume, issue } = props

  const handleLikeButton = () => {
    if (liked) {
      setCurrLikes((prevLikes) => prevLikes - 1)
      decrementLikes(_id)
    } else {
      setCurrLikes((prevLikes) => prevLikes + 1)
      incrementLikes(_id)
    }
    setLiked(!liked)
  }

  const handleArticleClick = () => {
    incrementViews(_id)
    router.push(`/article?year=${year}&issue=${issue}&volume=${volume}&id=${_id}`)
  }

  return (
    <>
      <Dialog
        open={sharepopup}
        onClose={() => setSharepopup(false)}
        aria-labelledby="share-dialog-title"
        aria-describedby="share-dialog-description"
      >
        <DialogTitle
          id="share-dialog-title"
          sx={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          {"Share Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="share-dialog-description">
            <span
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-around",
                marginBottom: "30px",
              }}
            >
              <button
                onClick={fbshare}
                style={{
                  background: "#4464a3",
                  borderRadius: "50%",
                  padding: "10px",
                }}
                aria-label="Share on Facebook"
              >
                <FaFacebookF size={30} color="white" />
              </button>
              <button
                onClick={twittershare}
                style={{
                  background: "#55acee",
                  borderRadius: "50%",
                  padding: "10px",
                }}
                aria-label="Share on Twitter"
              >
                <FaXTwitter size={30} color="white" />
              </button>
              <button
                onClick={lkdshare}
                style={{
                  background: "#0077b5",
                  borderRadius: "50%",
                  padding: "10px",
                }}
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn size={30} color="white" />
              </button>
              <button
                onClick={copyLink}
                style={{
                  background: "#333333",
                  borderRadius: "50%",
                  padding: "10px",
                }}
                aria-label="Copy link"
              >
                <AiOutlineLink size={30} color="white" />
              </button>
            </span>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <article className={styles.tile} itemScope itemType="http://schema.org/Article">
        <div className={styles.sec1}>
          <Image src="/logo2.jpg" alt="Library Herald Logo" width={30} height={30} priority />
          <p itemProp="publisher" itemScope itemType="http://schema.org/Organization">
            <span itemProp="name">Library Herald</span>
          </p>

          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setOption(!option)
            }}
            aria-label="More options"
            type="button"
          >
            <BsThreeDotsVertical />
          </button>
          {option && (
            <button
              className={styles.option}
              onClick={() => {
                setSharepopup(true)
                setOption(false)
              }}
              type="button"
              aria-label="Share post"
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginLeft: "25px",
                }}
              >
                <PiShareFatLight /> Share Post
              </span>
            </button>
          )}
        </div>

        <div
          className={styles.sec2}
          onClick={handleArticleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleArticleClick()
            }
          }}
          role="button"
          tabIndex={0}
        >
          <p style={{ fontSize: "13px" }}>
            <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationIssue">
              <span itemProp="issueNumber">issue {issue}</span> <span itemProp="datePublished">{year}</span>
            </span>
          </p>
          <h2 className={styles.title} itemProp="headline">
            {title}
          </h2>
          <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
            <p style={{ fontSize: "12.5px", marginTop: "2%" }}>
              <span itemProp="name">Library Herald</span>
              <br />
              <meta itemProp="pageStart" content={firstPage} />
              <meta itemProp="pageEnd" content={lastPage} />
              First page: ({firstPage}) Last page: ({lastPage})<br />
              Print ISSN: <span itemProp="issn">{printISSN}</span>. Online ISSN: {onlineISSN}.<br />
              Article DOI: <span itemProp="identifier">{doi}</span>
            </p>
          </div>
        </div>
        <div className={styles.horiLine} />
        <div className={styles.sec3}>
          <div>
            <IoEyeOutline aria-hidden="true" />
            <p>{views}</p>
          </div>
          <div>
            <p>{currLikes}</p>
            <button onClick={handleLikeButton} aria-label={liked ? "Unlike article" : "Like article"} type="button">
              {liked ? (
                <AiFillHeart color="#d52c49" aria-hidden="true" />
              ) : (
                <AiOutlineHeart color="#d52c49" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </article>
    </>
  )
}

export default Tile



*/
