'use client';

import React, { useState } from "react";
import Link from "next/link";
import styles from "./archive.module.css";
import DropdownButton from "../components/DropdownButton";
import { HOST_ADDRESS } from '../components/contants';

export default function ArchiveContent({ initialData, allYears }) {
  const [journals, setJournals] = useState(initialData.allJournals);
  const [currentJournals, setCurrentJournals] = useState(initialData.currentJournal);

  const handleFetchByYear = async (year) => {
    try {
      const res = await fetch(`${HOST_ADDRESS}/searhByYear/?year=${year}`);
      const data = await res.json();
      setJournals(data);
    } catch (error) {
      console.error('Error fetching journals by year:', error);
    }
  };

  return (
    <div className={styles.archBody}>
      <section className={styles.a1}>
        <h1
          style={{
            fontSize: "22px",
            lineHeight: "1.41em",
            fontWeight: "bold",
            color: "#3a54b4",
            textAlign: 'center'
          }}
        >
          Library Herald Archive Search
        </h1>
        <DropdownButton data={allYears} handleClick={handleFetchByYear} />

        <div className={styles.flexTable}>
          <div className={`${styles.flexItem} ${styles.header}`} style={{background:'#3a54b4', color:'white', position:'sticky', top: 0}}>
            <p className={styles.flexItemColumn1}>ISSUE</p>
            <p className={styles.flexItemColumn2}>YEAR</p>
          </div>
          {journals.map((elem, i) => (
            <div className={styles.flexItem} key={i}>
              <Link
                href={`/articles?year=${elem.year}&issue=${elem.issue}&volume=${elem.volume}`}
                className={styles.flexItemColumn1}
                style={{ color: "#3a54b4"}}
              >
                Volume-{elem.volume}, Issue-{elem.issue} ({elem.month})
              </Link>
              <p className={styles.flexItemColumn2} style={{ color: "black"}}>{elem.year}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.a2}>
        <h2
          style={{
            fontSize: "22px",
            lineHeight: "1.41em",
            fontWeight: "bold",
            color: "#3a54b4",
            textAlign: 'center'
          }}
        >
          Current Publication
        </h2>
        <div className={styles.flexTable}>
          <div className={`${styles.flexItem} ${styles.header}`} style={{background:'#3a54b4', color:'white'}}>
            <p className={styles.flexItemColumn1}>ISSUE</p>
            <p className={styles.flexItemColumn2}>YEAR</p>
          </div>
          {currentJournals.map((elem, i) => (
            <div className={styles.flexItem} key={i}>
              <Link
                href={`/articles?year=${elem.year}&issue=${elem.issue}`}
                className={styles.flexItemColumn1}
                style={{ color: "#3a54b4" }}
              >
                Volume-{elem.volume}, Issue-{elem.issue} ({elem.month})
              </Link>
              <p className={styles.flexItemColumn2} style={{ color: "black" }}>{elem.year}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
