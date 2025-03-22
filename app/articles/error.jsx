'use client';

export default function Error({ error, reset }) {
  return (
    <div className="content">
      <h1>Something went wrong!</h1>
      <p>There was an error loading the articles.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
