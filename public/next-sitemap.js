/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://library-herald.org',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://library-herald.org'}/server-sitemap.xml`,
    ],
  },
  exclude: ['/404', '/500'],
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom transformation for excluding dynamic routes that should be handled by server-sitemap
    if (path.includes('/articles/') || path.includes('/article/')) {
      return null;
    }
    
    // Set higher priority for important pages
    const priority = 
      path === '/' ? 1.0 : 
      path.startsWith('/about') ? 0.8 : 
      path.startsWith('/author-guidelines') ? 0.8 : 
      0.7;
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
} 