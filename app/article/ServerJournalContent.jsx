import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/logo2.jpg";
import { ArticleLikes, ArticleShare } from './ClientJournalContent';

/**
 * Server component for the article content
 * This optimizes initial load by rendering as much as possible on the server
 * while delegating interactive elements to client components
 */
export default function ServerJournalContent({ data, year, volume, issue }) {
  if (!data) {
    return (
      <div className="content">
        <div className="jContainer">
          <div className="jContent">
            <h1>Article Not Found</h1>
            <p>The requested article could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  // Format references if needed
  function re(text) {
    if (!text) return '';
    let pattern = /([1-5])(?=[A-Z])/g;
    let modifiedText = text.replace(pattern, "\n$1");
    return modifiedText;
  }

  return (
    <div className="content">
      <div className="jContainer">
        <div className="jContent">
          <div className="sec1" style={{ marginBottom: "25px" }}>
            <Image src={logo} alt="Library Herald Logo" width={150} height={50} />
            <p>Library Herald</p>
            {/* Using client component for share toggle */}
            <ArticleShare title={data.title} />
          </div>
          <div className="section">
            <h1>{data.title}</h1>
          </div>
          <div className="section">
            <p>
              Library Herald <br /> Year : {year}, Volume : {volume}, Issue :{" "}
              {issue} <br />
              First page : <b>({data.firstPage}) </b>
              Last page : <b>({data.lastPage})</b> <br />
              Print ISSN : {data.printISSN}. Online ISSN : {data.onlineISSN}.<br />
              Article DOI : {data.doi}
            </p>
          </div>
          <div className="section">
            <p style={{ fontWeight: "bold" }}>{data.title}</p>
          </div>
          <div className="section">
            <p style={{ whiteSpace: "pre-line" }}>
              <span style={{ fontWeight: "bold" }}>{data.authors}</span>
              {re(data.authorDetails)}
            </p>
          </div>
          {data.abstract && (
            <div className="section">
              <p style={{ fontWeight: "bold" }}>Abstract</p>
              <p style={{ textAlign: "justify" }}>{data.abstract}</p>
            </div>
          )}
          {data.keywords && (
            <div className="section">
              <p style={{ fontWeight: "bold" }}>Keywords</p>
              <p>{data.keywords}</p>
            </div>
          )}
          <div id="hori-line" style={{ marginTop: "45px" }} />
          <div className="socials">
            <div className="logos">
              {/* Replaced with client component */}
              <ArticleShare title={data.title} />
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
              <p>{data.views || 0} views</p>
            </div>
            <div>
              {/* Using client component for likes */}
              <ArticleLikes id={data._id} initialLikes={data.likes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 