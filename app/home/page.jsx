"use client"
import { useState } from "react"
import book from "../../public/Lib.jpg"
import image from "../../public/image.jpg"
import image2 from "../../public/journalCropped.jpg"
import image3 from "../../public/image3.jpg"

import Button from "../components/Button"
import HomeTabs from "../components/HomeTabs"
import EditorLists from "../components/EditorLists"
import ContactUsForm from "../components/ContactUsForm"

import { jointEditors, associateEditors, advisoryBoard } from "../../public/homePage"

// import { useNavigate } from "react-router-dom"
import styles from "./home.module.css"

const Home = () => {
  // const navigate = useNavigate()
  const [latestJournalDetails, setLatestJournalDetails] = useState("")

  // const fetchLatestJournalDetails = async() =>{
  //   fetch(`${HOST_ADDRESS}/`, {
  //     method:'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(res => res.json())
  //   .then(details => setLatestJournalDetails(details))
  //   .catch(err => console.log(err))
  // }

  const handleLatestJournalDetails = () => {
    navigate(
      `/articles/?year=${latestJournalDetails._id}&issue=${latestJournalDetails.issue}&volume=${latestJournalDetails.volume}`,
    )
  }

  // useEffect(()=>{
  //   fetchLatestJournalDetails();
  // },[])

  return (
    <div className={styles.content}>
      {/* <div className={styles.strip}>
     <div className={styles.flexContainer}>
        <div className={styles.flexItem}>
          <img className={styles.libh_img} src={book || "/placeholder.svg"} alt="lib herald" />
        </div>
        <div className={styles.flexItem}>
          <div className={styles.flexTextContainer}>
            <span className={styles.titleTxt}>WELCOME TO LIBRARY HERALD</span>
            <p className={styles.s1P}>
              Library Herald publishes peer-reviewed original contributions in
              the field of Library and Information Science. It also incorporates
              research reports and includes reviews of important Indian and
              foreign publications. Special issues on various aspects of Library
              and Information Science are also published from time to time. It
              is published quarterly in March, June, September and December
              every year.
            </p>
            <p id="ph">Current Issue</p>
            <button class="bg-blue w-40 h-11 rounded-lg hover:bg-red" style={{color:'white'}}  onClick={()=>handleLatestJournalDetails()}>{latestJournalDetails ? `Vol ${latestJournalDetails.volume} No. ${latestJournalDetails.issue} ${latestJournalDetails._id}` : '....'}</button>
          </div>
        </div>
      </div>
     </div> */}

      <div className={styles.hsection}>
        <div className={styles.s1}>
          <img className={styles.libhImg} src={book || "/placeholder.svg"} alt="lib herald" />
          <div className={styles.s1Txt}>
            <span className={styles.titleTxt} id="welcome">
              WELCOME TO LIBRARY HERALD
            </span>
            <p className={styles.s1P}>
              Library Herald publishes peer-reviewed original contributions in the field of Library and Information
              Science. It also incorporates research reports and includes reviews of important Indian and foreign
              publications. Special issues on various aspects of Library and Information Science are also published from
              time to time. It is published quarterly in March, June, September and December every year.
            </p>
            <p id="ph">Current Issue</p>
            {/* <button class="bg-blue w-40 h-11 rounded-lg hover:bg-red" style={{color:'white'}}  onClick={()=>handleLatestJournalDetails()}>{latestJournalDetails ? `Vol ${latestJournalDetails.volume} No. ${latestJournalDetails.issue} ${latestJournalDetails._id}` : '....'}</button> */}
          </div>
        </div>
      </div>
      <div className={styles.hsection} id="aboutAnchor">
        <div className={styles.s2}>
          <span
            style={{
              fontSize: "40px",
              textAlign: "center",
              color: "#fde6aa",
              fontWeight: "500",
            }}
          >
            ABOUT THE JOURNAL
          </span>
          <span className={styles.s2Txt}>
            Library Herald is a double blind peer reviewed scholarly research journal published quarterly by Delhi
            Library Association (DLA). Library Herald indexed in UGC-CARE List (No. 593). It began publication in 1958.
            The first issue had an article on Document, Documentation and Standardization by Dr. S.R. Ranganathan.
            Library Herald has a strong base with stalwarts like Prof. S Das Gupta, Prof. P N Kaula, Shri RS Goyal, Shri
            K S Pareek, Shri Jainath Kaul and Shri K S Dalal associated with the editorial initially. In 1961 the
            editorial board was reconstituted and editorship was entrusted to Shri NK Goil assisted by Shri HC Jain and
            Ms. V Sundaram. After Shri Goil's death the editorial board was again reconstituted in 1980 with Prof.
            Krishan Kumar as editor and Prof. M M Kashyap and Prof. CP Vashishth as Associate Editors. In October 2005
            the editorial board was once again reconstituted with Professor CP Vashishth as Editor and Dr. Sunil Kumar
            and Dr. RK Sharma as Associate Editors. After the demise of Prof. CP Vashishth in 2019, the editorship was
            entrusted to Prof. Jaideep Sharma with Prof. KP Singh and Ms. Renu Arora as Joint Editors. Currently Prof. R
            K Bhatt is the editor of Library Herald.
          </span>
        </div>
      </div>

      <div className={styles.hsection}>
        <div className={styles.s3}>
          <HomeTabs
            heading={"AIMS & SCOPE"}
            text={
              "Library Herald publishes original research in the field of Library and Information Science. It also incorporates research reports and includes reviews of important Indian and foreign publications. Special issues on various aspects of Library and Information Science are also published from time to time."
            }
          />
          <HomeTabs
            heading={"SUBSCRIPTION"}
            text={"Its annual subscription is Rs. 2,000 in India and the US $ 50 for subscribers abroad."}
          />
          <HomeTabs
            heading={"ACCESSIBILITY"}
            text={
              <span>
                Through Print & Online. <br /> It is one of the oldest journals in India (Start in 1958) in the field of
                Library and Information Science patronized by Dr. S R Ranganathan. Since 2010 the Library Herald is
                accessible online through the interface of IndianJournals.com
              </span>
            }
          />
        </div>
      </div>
      <div className={styles.hsection} id="editorialAnchor">
        <div className={styles.s4} id="editorialAnchor">
          <div className={styles.s4Heading}>
            <img src={image || "/placeholder.svg"} className={styles.s4Img} />
            <span className={styles.titleTxt}>EDITORIAL BOARD</span>
          </div>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.75em",
              fontStyle: "italic",
            }}
          >
            Our Reputation Speaks for Itself
          </p>
          <p
            style={{
              fontSize: "40px",
              lineHeight: "1.35em",
              fontWeight: "500",
              color: "#3a54b4",
            }}
          >
            EDITOR
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                lineHeight: "1.75em",
              }}
            >
              Dr. Rakesh Kumar Bhatt
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                lineHeight: "1.75em",
              }}
            >
              Professor, Department of Library and Information Science
              <br />
              North Campus. University of Delhi, Delhi
              <br />
              9711978544
            </p>
          </div>
        </div>
      </div>
      <div className={styles.hsection}>
        <div className={styles.s6}>
          <p
            style={{
              fontSize: "40px",
              lineHeight: "1.35em",
              fontWeight: "500",
              color: "#3a54b4",
              marginBottom: "60px",
            }}
          >
            JOINT EDITORS
          </p>
          <EditorLists data={jointEditors} />
        </div>
      </div>
      <div className={styles.hsection}>
        <div className={styles.s7}>
          <p
            style={{
              fontSize: "40px",
              lineHeight: "1.35em",
              fontWeight: "500",
              color: "#3a54b4",
              marginBottom: "60px",
              textAlign: "center",
            }}
          >
            ASSOCIATE EDITORS
          </p>
          <EditorLists data={associateEditors} />
        </div>
      </div>
      <div className={styles.hsection}>
        <div className={styles.s8}>
          <p
            style={{
              fontSize: "40px",
              lineHeight: "1.35em",
              fontWeight: "500",
              color: "#3a54b4",
              marginBottom: "60px",
              textAlign: "center",
            }}
          >
            ADVISORY BOARD
          </p>
          <EditorLists data={advisoryBoard} />
        </div>
      </div>
      <div className={styles.hsection}>
        <div className={styles.s9}>
          <p
            style={{
              fontSize: "40px",
              lineHeight: "1.35em",
              fontWeight: "500",
              color: "#3a54b4",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            MANAGING EDITORS
          </p>
          <p className={styles.s9Text}>
            <b>
              Prof. Rakesh Kumar Bhatt
              <br />
              Dr. J N Singh
              <br />
              Dr. S K Bajpai
            </b>
          </p>
        </div>
      </div>

      <div className={styles.hsection}>
        <div className={styles.s10}>
          <img src={image2 || "/placeholder.svg"} style={{ borderRadius: "5px" }} />
          <p
            style={{
              fontSize: "40px",
              lineHeight: "1.35em",
              fontWeight: "500",
              color: "white",
              textShadow: "rgba(255, 255, 255, 0.6) 1px 1px 1px, rgba(0, 0, 0, 0.6) -1px -1px 1px;",
              textAlign: "center",
            }}
          >
            GET YOUR JOURNAL NOW!
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.75em",
              color: "white",
              textDecoration: "underline",
            }}
          >
            <b>On an annual subscription of Rs.2,000</b>
          </p>
          <Button buttonText="Subscribe" bgcolor={"#fff2d4"} textColor={"black"} onClick={() => {}} />
        </div>
      </div>

      <div className={styles.hsection}>
        <div className={styles.s11}>
          <div className={styles.overlapingDiv1}>
            <p
              style={{
                fontSize: "22px",
                lineHeight: "1.41em",
                fontWeight: "bold",
                color: "#3a54b4",
              }}
            >
              ALL CORRESPONDENCE SHOULD BE ADDRESSED TO
            </p>
            <p>
              <b>Managing Editors</b>
              <br />
              Professor Rakesh Kumar Bhatt
              <br />
              Dr. JN Singh
              <br />
              Dr. SK Bajpai
            </p>
            <p>
              LIBRARY HERALD
              <br />
              Ranganathan Bhavan, 'C' Block,
              <br />
              Community Centre, Near CGHS Dispensary,
              <br />
              Naraina Vihar,
              <br />
              New Delhi-110028, India.
            </p>
            <p>
              E-mail:
              <a href="mailto:libraryherald@gmail.com">libraryherald@gmail.com</a>
              <br />
              Website:<a href="https://dlaindia.in/">dlaindia.in</a>
            </p>
          </div>
          <img id="overlapingImg" src={image3 || "/placeholder.svg"} />
        </div>
      </div>

      <div className={styles.hsection}>
        <div className={styles.s12}>
          <p
            style={{
              fontSize: "40px",
              lineHeight: "1.35em",
              fontWeight: "500",
              color: "#3a54b4",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            CONTACT US
          </p>
          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.35em",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Feel free to ask any queries
          </p>
          <div id="contactAnchor">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

