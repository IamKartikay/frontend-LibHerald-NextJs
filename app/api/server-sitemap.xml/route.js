import { getServerSideSitemap } from 'next-sitemap';

export async function GET() {
  // Get data from your database
  try {
    // Example: fetch articles from your API or database
    const articlesRes = await fetch(`${process.env.API_URL || 'https://api.library-herald.org'}/articles`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    const articles = await articlesRes.json();

    // Generate entries for the sitemap
    const fields = articles.map(article => ({
      loc: `${process.env.SITE_URL || 'https://library-herald.org'}/article/${article._id}`,
      lastmod: new Date(article.updatedAt || article.createdAt).toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
    }));

    // For archive pages (if you have them)
    const years = [...new Set(articles.map(article => article.year))];
    
    for (const year of years) {
      fields.push({
        loc: `${process.env.SITE_URL || 'https://library-herald.org'}/articles?year=${year}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6,
      });
    }

    return getServerSideSitemap(fields);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return an empty sitemap if there's an error
    return getServerSideSitemap([]);
  }
}

export const dynamic = 'force-dynamic'; 