// Lists of terms to check for Google Ad Grants compliance
export const bannedTerms = [
  "achat", "promotion", "promo", "prix", "soldes", "remise", "discount",
  "offre", "exclusif", "limité", "gratuit", "free", "buy", "purchase", 
  "shopping", "shop", "deal", "coupon", "avantage", "profitez"
];

export const warningTerms = [
  "cure", "traitement", "guérison", "solution", "thérapie", "therapy",
  "miracle", "résout", "soulage", "améliore", "improves", "resolves",
  "drogues", "drugs", "narcotiques", "narcotic", "toxicomanie", "addiction"
];

// Detect banned terms in content
export const detectBannedTerms = (content: string): string[] => {
  const lowercaseContent = content.toLowerCase();
  return bannedTerms.filter(term => 
    lowercaseContent.includes(term.toLowerCase())
  );
};

// Check if a URL is compliant with Google Ad Grant policies
export const isUrlCompliant = (url: string): boolean => {
  // Check if URL contains banned terms
  const lowercaseUrl = url.toLowerCase();
  const hasBannedTerms = bannedTerms.some(term => 
    lowercaseUrl.includes(term.toLowerCase())
  );

  // Check for commercial patterns in URL
  const hasCommercialPattern = /buy|purchase|shop|cart|pricing/i.test(lowercaseUrl);

  return !hasBannedTerms && !hasCommercialPattern;
};

// Check if a URL is compliant with content safety guidelines
export const isUrlCompliantContentSafety = (url: string): boolean => {
  const bannedPatterns = [
    /gambling/i, /casino/i, /porn/i, /adult/i, /alcohol/i, /tobacco/i,
    /drugs/i, /weapons/i, /firearms/i
  ];

  return !bannedPatterns.some(pattern => pattern.test(url));
};

// Detect warning terms that may cause issues
export const detectWarningTerms = (content: string): string[] => {
  const lowercaseContent = content.toLowerCase();
  return warningTerms.filter(term => 
    lowercaseContent.includes(term.toLowerCase())
  );
};

// More advanced detection with word boundary check
export const detectBannedTermsWithContext = (content: string): string[] => {
  const lowercaseContent = content.toLowerCase();
  return bannedTerms.filter(term => {
    const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, 'i');
    return regex.test(lowercaseContent);
  });
};

// NLP-based detection to consider context (simplified)
export const detectBannedTermsWithNLP = (content: string): Array<{term: string, context: string}> => {
  const results: Array<{term: string, context: string}> = [];
  const sentences = content.split(/[.!?]+/);

  for (const term of bannedTerms) {
    for (const sentence of sentences) {
      if (sentence.toLowerCase().includes(term.toLowerCase())) {
        // Get surrounding context (the whole sentence)
        results.push({
          term,
          context: sentence.trim()
        });
        // Only get first occurrence per sentence
        break;
      }
    }
  }

  return results;
};

// Check if term appears in educational context
export const isEducationalContext = (context: string): boolean => {
  const educationalMarkers = [
    "research", "study", "science", "scientific", "education", "educational",
    "learn", "learning", "recherche", "étude", "science", "scientifique", 
    "éducation", "éducatif", "apprendre", "apprentissage"
  ];

  const lowercaseContext = context.toLowerCase();
  return educationalMarkers.some(marker => 
    lowercaseContext.includes(marker)
  );
};

// Add semantic variety to content while keeping educational intent
export const semanticRotator = (originalText: string): string => {
  const replacements: Record<string, string[]> = {
    "buy": ["explore", "discover", "learn about"],
    "achat": ["découverte", "exploration", "apprentissage sur"],
    "price": ["value", "benefit", "advantage"],
    "prix": ["valeur", "bénéfice", "avantage"],
    "shop": ["browse", "view", "explore"],
    "shopping": ["browsing", "exploring", "learning"],
    "offer": ["provide", "present", "share"],
    "offre": ["propose", "présente", "partage"]
  };

  let result = originalText;

  Object.entries(replacements).forEach(([term, alternatives]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    result = result.replace(regex, () => {
      const randomIndex = Math.floor(Math.random() * alternatives.length);
      return alternatives[randomIndex];
    });
  });

  return result;
};

/**
 * Performs comprehensive audit of page content for Google Ad Grant compliance
 * @param content HTML content to audit
 * @returns Audit results with compliance status and issues list
 */
export const auditPageContent = (content: string) => {
  const issues: Array<{
    type: 'error' | 'warning';
    message: string;
    details?: string;
  }> = [];

  // Check for banned terms
  const foundBannedTerms = detectBannedTerms(content);
  if (foundBannedTerms.length > 0) {
    issues.push({
      type: 'error',
      message: `Content contains banned terms: ${foundBannedTerms.join(', ')}`,
      details: 'These terms may violate Google Ad Grant policies related to commercial intent or prohibited content'
    });
  }

  // Check for warning terms
  const foundWarningTerms = detectWarningTerms(content);
  if (foundWarningTerms.length > 0) {
    issues.push({
      type: 'warning',
      message: `Content contains potentially problematic terms: ${foundWarningTerms.join(', ')}`,
      details: 'These terms may trigger policy reviews or affect account quality'
    });
  }

  // Check for prohibited patterns (like pricing or payment structures)
  if (/\$\d+|\d+\s?\$|€\d+|\d+\s?€|\d+\s?USD|\d+\s?EUR/gi.test(content)) {
    issues.push({
      type: 'error',
      message: 'Content contains pricing information',
      details: 'Displaying prices may violate Google Ad Grant policies against commercial content'
    });
  }

  // Check for "Buy Now" or "Purchase" type call-to-action
  if (/buy now|add to cart|purchase|commander maintenant|ajouter au panier|acheter|panier d'achat|shopping cart/gi.test(content)) {
    issues.push({
      type: 'error',
      message: 'Content contains commercial calls-to-action',
      details: 'These CTAs may violate Google Ad Grant policies regarding commercial intent'
    });
  }

  return {
    isCompliant: issues.filter(issue => issue.type === 'error').length === 0,
    hasWarnings: issues.filter(issue => issue.type === 'warning').length > 0,
    issues
  };
};

// Validate redirect URLs for policy compliance
export const validateRedirectUrl = (url: string): boolean => {
  // Check for common e-commerce platforms that would violate policy
  const prohibitedDomains = [
    'amazon.com', 'amazon.fr', 'ebay.com', 'shopify.com', 
    'etsy.com', 'aliexpress.com'
  ];

  return !prohibitedDomains.some(domain => url.includes(domain));
};

// Generate a compliant page title for Google Ad Grant
export const generateCompliantTitle = (originalTitle: string): string => {
  // Replace commercial terms with educational alternatives
  let compliantTitle = semanticRotator(originalTitle);

  // Add educational qualifier if not present
  const educationalQualifiers = ['Guide to', 'Understanding', 'Learning About', 'The Science of'];
  const hasQualifier = educationalQualifiers.some(q => compliantTitle.includes(q));

  if (!hasQualifier && compliantTitle.length < 50) {
    const randomQualifier = educationalQualifiers[Math.floor(Math.random() * educationalQualifiers.length)];
    compliantTitle = `${randomQualifier} ${compliantTitle}`;
  }

  return compliantTitle;
};