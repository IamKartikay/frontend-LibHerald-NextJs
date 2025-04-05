'use client';

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logonobg.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [navDrop, setNavDrop] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [hamNavDrop, setHamNavDrop] = useState(false);

  const handleNavbarAnchoring = (anchorTag, id) => {
    window.location.href = "/#" + id + "Anchor";
  };

  const handleMouseExit = () => {
    setTimeout(() => {
      setNavDrop(false);
    }, 2000);
  };

  return (
    <nav>
      {!hamburger && (
        <div className={styles.navbarContainerSm}>
          <Link className={styles.heading} href="/">
            LIBRARY HERALD
          </Link>
          <div>
            <button onClick={() => setHamburger(true)}>
              <GiHamburgerMenu color="white" />
            </button>
          </div>
        </div>
      )}
      {hamburger && (
        <div className={styles.hamburgerMenu}>
          <button
            className={styles.closeHamburgerBtn}
            onClick={() => setHamburger(false)}
          >
            <IoMdClose />
          </button>
          <div className={styles.hamburgerItems}>
            <Link
              href="/"
              onClick={() => {
                setHamburger(false);
                setHamNavDrop(false);
              }}
            >
              Home
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
                gap: "2px",
              }}
            >
              <button onClick={() => setHamNavDrop(!hamNavDrop)}>
                About
              </button>
              {hamNavDrop ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </div>

            {hamNavDrop && (
              <div className={styles.hamNavDrop}>
                <a
                  id="about"
                  onClick={(event) => {
                    handleNavbarAnchoring(event.target, event.target.id);
                    setHamburger(false);
                    setHamNavDrop(false);
                  }}
                >
                  About the Journal
                </a>
                <a
                  id="editorial"
                  onClick={(event) => {
                    handleNavbarAnchoring(event.target, event.target.id);
                    setHamburger(false);
                    setHamNavDrop(false);
                  }}
                >
                  Editorial Board
                </a>
                <Link
                  href="/author-guidelines"
                  onClick={() => {
                    setHamburger(false);
                    setHamNavDrop(false);
                  }}
                >
                  Author Guidelines
                </Link>
                <Link
                  href="/copyright-form"
                  onClick={() => {
                    setHamburger(false);
                    setHamNavDrop(false);
                  }}
                >
                  Copyright Assignment Form
                </Link>
              </div>
            )}
            <Link
              href="/archieve"
              onClick={() => {
                setHamburger(false);
                setHamNavDrop(false);
              }}
            >
              Archive
            </Link>
            <a
              id="contact"
              onClick={(event) => {
                handleNavbarAnchoring(event.target, event.target.id);
                setHamburger(false);
                setHamNavDrop(false);
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}

      <div className={styles.navbarContainerLg}>
        <div className={styles.navSection1}>
          <Link href="/">
            <Image src={logo} alt="Library Herald" width={120} height={60} priority />
          </Link>
        </div>
        <div className={styles.navSection2}>
          <Link href="/" className={styles.headingLg}>
            LIBRARY HERALD
          </Link>
        </div>
        <div className={styles.navSection3}>
          <Link href="/">Home</Link>
          <a onMouseEnter={() => setNavDrop(true)}>
            About
          </a>
          {navDrop && (
            <div className={styles.navDrop} onMouseLeave={handleMouseExit}>
              <a
                id="about"
                onClick={(event) =>
                  handleNavbarAnchoring(event.target, event.target.id)
                }
              >
                About the Journal
              </a>
              <a
                id="editorial"
                onClick={(event) =>
                  handleNavbarAnchoring(event.target, event.target.id)
                }
              >
                Editorial Board
              </a>
              <Link href="/authorGuidelines">Author Guidelines</Link>
              <Link href="/copyright-assignment-form">
                Copyright Assignment Form
              </Link>
            </div>
          )}
          <Link href="/archieve">Archive</Link>
          <a
            id="contact"
            onClick={(event) =>
              handleNavbarAnchoring(event.target, event.target.id)
            }
          >
            Contact Us
          </a>
          <button className={styles.subscribeBtn}>Subscribe</button>
        </div>
      </div>
    </nav>
  );
} 