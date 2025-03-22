'use client';

export default function Error({ error, reset }) {
  return (
    <div className="content">
      <div className="jContainer">
        <div className="jContent">
          <h2>Something went wrong!</h2>
          <p>We couldn't load the article. Please try again.</p>
          <button 
            onClick={() => reset()}
            className="customButton"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
} 