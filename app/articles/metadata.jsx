// app/articles/metadata.js
export async function generateMetadata({ searchParams }) {
    const { year, issue, volume } = searchParams;
    
    return {
      title: `Articles - Volume ${volume}, Issue ${issue} (${year}) | Library Herald`,
      description: `Browse articles from Library Herald Volume ${volume}, Issue ${issue} published in ${year}`,
    };
  }