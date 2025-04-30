
/**
 * Utility to ping search engines when the sitemap is updated
 * This should be used in a build script or after content updates
 */

export const pingSitemapToSearchEngines = async () => {
  const sitemapUrl = 'https://naturalpureacademy.org/sitemap.xml';
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://search.entireweb.com/ping?url=${encodeURIComponent(sitemapUrl)}`
  ];

  try {
    const results = await Promise.allSettled(
      searchEngines.map(engine => 
        fetch(engine, { method: 'GET' })
          .then(response => ({ 
            engine, 
            success: response.ok, 
            status: response.status 
          }))
      )
    );

    const successfulPings = results.filter(
      result => result.status === 'fulfilled' && (result.value as any).success
    ).length;

    console.log(`Sitemap pinged to ${successfulPings} of ${searchEngines.length} search engines`);
    
    return {
      success: successfulPings > 0,
      totalPinged: searchEngines.length,
      successfulPings,
      details: results
    };
  } catch (error) {
    console.error('Error pinging sitemap:', error);
    return {
      success: false,
      error
    };
  }
};

export default pingSitemapToSearchEngines;
