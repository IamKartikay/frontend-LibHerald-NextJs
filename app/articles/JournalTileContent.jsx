'use client';

import React from "react";
import Tile from "../components/Tile";

export default function JournalTileContent({ initialData, year, volume, issue }) {
  if (!initialData || initialData.length === 0) {
    return (
      <div className="content">
        <h1>No Articles Found</h1>
        <p>No articles found for the selected year and issue.</p>
      </div>
    );
  }

  return (
    <div className="content">
      <h1 style={{ 
        fontSize: "22px", 
        lineHeight: "1.41em", 
        fontWeight: "bold", 
        color: "#3a54b4",
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        Volume {volume}, Issue {issue} ({year})
      </h1>
      <div className="journalTiles">
        {initialData.map((e, i) => (
          <Tile key={i} data={e} year={year} volume={volume} issue={issue}/>
        ))}
      </div>
    </div>
  );
}
