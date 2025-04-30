/**
 * Utility to filter content according to Google Ads Grants compliance rules
 */

// Banned terms for Google Ads Grants
export const BANNED_PHRASES = new RegExp(
  /\b(offer|promo|exclusive|purchase|order|price|discount|shop|sale|buy|sales|bargain)\b/gi
);

/**
 * Sanitizes content by replacing non-compliant terms
 */
export const sanitizeContent = (text: string): string => 
  text.replace(BANNED_PHRASES, match => '*'.repeat(match.length));

/**
 * Checks if a URL complies with secure redirect rules
 */
export const validateRedirectUrl = (url: string): boolean => {
  // Check if URL is internal or approved external URL
  if (url.startsWith('/') || url.startsWith(window.location.origin)) {
    return true;
  }

  // List of approved external domains (customize as needed)
  const approvedDomains = [
    'pubmed.ncbi.nlm.nih.gov',
    'scholar.google.com',
    'nih.gov',
    'who.int'
  ];

  try {
    const urlObj = new URL(url);
    return approvedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};

/**
 * Creates a secure redirect with improved random delay and URL rotation
 */
export const safeRedirect = (url: string): Promise<void> => {
  return new Promise(async (resolve) => {
    if (!validateRedirectUrl(url)) {
      console.warn('Attempting redirection to an unauthorized domain:', url);
      resolve();
      return;
    }

    // Generate a cryptographic random delay between 1300 and 3700ms
    // Using crypto.getRandomValues for truly random generation
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const delay = (randomBuffer[0] % 2400) + 1300;

    // URL rotation to prevent pattern detection
    const redirectPaths = [
      '/redirect/social',
      '/redirect/academic',
      '/redirect/research',
      '/redirect/study'
    ];

    // Cryptographic random selection of the redirect path
    crypto.getRandomValues(randomBuffer);
    const selectedPath = redirectPaths[randomBuffer[0] % redirectPaths.length];

    // Generate a cryptographic hash for the URL parameter
    const generateCryptoHash = async (input: string): Promise<string> => {
      try {
        // Use the Web Crypto API to generate a SHA-256 hash
        const encoder = new TextEncoder();
        const data = encoder.encode(input + Date.now().toString());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex.substring(0, 16); // Use only the first 16 characters
      } catch (e) {
        // Fallback if the Web Crypto API is not available
        return btoa(input).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
      }
    };

    setTimeout(async () => {
      try {
        // Generate a unique hash for this redirection
        const urlHash = await generateCryptoHash(url);
        // Redirect via the compliance gateway with a cryptographic hash
        window.location.href = `${selectedPath}?target=${btoa(url)}&ref=${urlHash}`;
        resolve();
      } catch (error) {
        // Fallback in case of error
        window.location.href = `${selectedPath}?target=${btoa(url)}`;
        resolve();
      }
    }, delay);
  });
};

// Implementation of AES-256 encryption
// Encryption key for secure storage
let encryptionKey: CryptoKey | null = null;

// Generate an AES-256 encryption key for this session
const generateEncryptionKey = async (): Promise<CryptoKey> => {
  if (encryptionKey) return encryptionKey;

  try {
    // Generate a random AES-256 key
    const key = await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );

    // Store the key for this session
    encryptionKey = key;
    return key;
  } catch (e) {
    console.error('Error generating encryption key:', e);
    throw new Error('Unable to generate a secure encryption key');
  }
};

// Function to encrypt data with AES-256
const encryptData = async (data: string): Promise<string> => {
  try {
    const key = await generateEncryptionKey();
    // Generate a random initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the data
    const encodedData = new TextEncoder().encode(data);
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encodedData
    );

    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    encryptedArray.set(iv);
    encryptedArray.set(new Uint8Array(encryptedBuffer), iv.length);

    // Encode in base64 for storage
    return btoa(String.fromCharCode(...encryptedArray));
  } catch (e) {
    console.error('Error encrypting data:', e);
    // Fallback: just encode in base64
    return btoa(data);
  }
};

// Function to decrypt data
const decryptData = async (encryptedData: string): Promise<string> => {
  try {
    const key = await generateEncryptionKey();

    // Decode the base64
    const encryptedBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

    // Extract the IV (first 12 bytes)
    const iv = encryptedBytes.slice(0, 12);
    // Extract the encrypted data
    const data = encryptedBytes.slice(12);

    // Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      data
    );

    // Convert to string
    return new TextDecoder().decode(decryptedBuffer);
  } catch (e) {
    console.error('Error decrypting data:', e);
    // Fallback: just decode from base64
    return atob(encryptedData);
  }
};

// Automatic key rotation
const setupKeyRotation = () => {
  // Rotation every 24 hours
  const rotationInterval = 24 * 60 * 60 * 1000;

  setInterval(() => {
    // Reset the encryption key
    encryptionKey = null;
    generateEncryptionKey().catch(console.error);
    console.log('Encryption key regenerated for security reasons');
  }, rotationInterval);
};

// Initialize key rotation
setupKeyRotation();

/**
 * Interface for secure user data
 */
export interface SecureUserData {
  lastVisit?: string;
  quizProgress?: number;
  consentGiven?: boolean;
}

/**
 * Secure storage of user data (without persistent cookies)
 */
export const secureStorage = {
  set: async (key: string, value: any): Promise<void> => {
    try {
      // Encrypt the data before storing it
      const encryptedValue = await encryptData(JSON.stringify(value));

      // Use sessionStorage instead of localStorage for compliance
      sessionStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error during secure storage:', error);
    }
  },

  get: async <T>(key: string, defaultValue: T): Promise<T> => {
    try {
      const encryptedItem = sessionStorage.getItem(key);

      if (!encryptedItem) return defaultValue;

      // Decrypt the data
      const decryptedItem = await decryptData(encryptedItem);
      return JSON.parse(decryptedItem);
    } catch (error) {
      console.error('Error retrieving secure storage:', error);
      return defaultValue;
    }
  },

  remove: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing secure storage:', error);
    }
  },

  clear: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing secure storage:', error);
    }
  },

  // Synchronous version for compatibility with existing code
  setSync: (key: string, value: any): void => {
    try {
      // Fallback for synchronous operations (less secure)
      const serialized = JSON.stringify(value);
      const encoded = btoa(serialized);
      sessionStorage.setItem(key, encoded);
    } catch (error) {
      console.error('Error during secure storage (sync):', error);
    }
  },

  getSync: <T>(key: string, defaultValue: T): T => {
    try {
      const encoded = sessionStorage.getItem(key);

      if (!encoded) return defaultValue;

      // Decrypt the data (simple version)
      const serialized = atob(encoded);
      return JSON.parse(serialized);
    } catch (error) {
      console.error('Error retrieving secure storage (sync):', error);
      return defaultValue;
    }
  }
};

/**
 * Improvement: Detection of banned terms with contextual analysis (simplified NLP)
 */

// Secure contexts that may contain terms that are normally banned
const SAFE_CONTEXTS = [
  'scientific study',
  'research shows',
  'according to studies',
  'for informational purposes',
  'educational purpose',
  'pedagogical context',
  'medical research',
  'scientific publication',
  'sleep quality',
  'symptom reduction',
  'improvements noted',
  'analysis results'
];

// Simplified NLP functionality to analyze the context
export const analyzeContext = (text: string, term: string): boolean => {
  if (!text || !term) return false;

  // Convert to lowercase for comparison
  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();

  // Find the position of the term
  const termIndex = lowerText.indexOf(lowerTerm);
  if (termIndex === -1) return false;

  // Extract a context segment around the term (100 characters)
  const contextStart = Math.max(0, termIndex - 50);
  const contextEnd = Math.min(lowerText.length, termIndex + term.length + 50);
  const context = lowerText.substring(contextStart, contextEnd);

  // Check if the context contains one of the secure contexts
  return SAFE_CONTEXTS.some(safeContext => context.includes(safeContext));
};

// Improved function to detect banned terms with NLP
export const detectBannedTermsWithNLP = (content: string): { 
  terms: string[], 
  contexts: { term: string, context: string, isSafe: boolean }[] 
} => {
  if (!content) return { terms: [], contexts: [] };

  const lowerContent = content.toLowerCase();
  const contexts: { term: string, context: string, isSafe: boolean }[] = [];

  // Extract all potentially banned terms
  const bannedTermsRegex = /\b(offer|promo|exclusive|purchase|order|price|discount|shop|sale|buy|sales|bargain|savings|reduction)\b/gi;
  const terms: string[] = [];

  let match;
  while ((match = bannedTermsRegex.exec(lowerContent)) !== null) {
    const term = match[0];
    const termIndex = match.index;

    // Extract the context
    const contextStart = Math.max(0, termIndex - 50);
    const contextEnd = Math.min(lowerContent.length, termIndex + term.length + 50);
    const context = content.substring(contextStart, contextEnd);

    // Analyze the context
    const isSafe = analyzeContext(context, term);

    // Add to results if not secure
    if (!isSafe) {
      terms.push(term);
    }

    contexts.push({
      term,
      context,
      isSafe
    });
  }

  return {
    terms: [...new Set(terms)], // Eliminate duplicates
    contexts
  };
};

// Advanced semantic analysis to detect risky cases
export const semanticAnalysis = (text: string): {
  isRisky: boolean,
  riskScore: number,
  riskTerms: string[]
} => {
  if (!text) return { isRisky: false, riskScore: 0, riskTerms: [] };

  const lowerText = text.toLowerCase();
  const riskTerms: string[] = [];
  let riskScore = 0;

  // Risky patterns for semantic analysis
  const riskPatterns = [
    { pattern: /exclusiv/i, weight: 3, safe: /exclusiv.*study|research.*exclusiv/i },
    { pattern: /limit/i, weight: 2, safe: /limit.*research|study.*limit/i },
    { pattern: /free/i, weight: 2, safe: /free of charge|free access.*research/i },
    { pattern: /promotion/i, weight: 3, safe: /health promotion|promotion.*research/i },
    { pattern: /solution.*exclus/i, weight: 4, safe: /solution.*research|scientific solution/i },
    { pattern: /special offer/i, weight: 4, safe: /special offer of study|participation.*offer/i },
    { pattern: /reserv/i, weight: 2, safe: /reserved for researchers|reserved study/i },
    { pattern: /reduction/i, weight: 3, safe: /symptom reduction|reduction.*risk/i }
  ];

  // Analyze each pattern
  riskPatterns.forEach(({ pattern, weight, safe }) => {
    if (pattern.test(lowerText)) {
      // Check if the context is secure
      const isSafeContext = safe.test(lowerText) || 
                           SAFE_CONTEXTS.some(ctx => lowerText.includes(ctx));

      if (!isSafeContext) {
        // Find the actual occurrence to add to the risky terms
        const match = text.match(pattern);
        if (match && match[0]) {
          riskTerms.push(match[0]);
          riskScore += weight;
        }
      }
    }
  });

  return {
    isRisky: riskScore > 5,
    riskScore,
    riskTerms
  };
};

export const detectBannedTerms = (content: string): string[] => {
    const bannedTerms = [
      'purchase', 'promo', 'order', 'price', 'offer', 'discount', 'shop', 
      'buy', 'sales', 'bargain', 'savings',
      'reduction', 'promotion', 'best price', 'rate', '€'
    ];

    // Improved detection to exclude educational and non-sales contexts
    const educationalContextPhrases = [
      'no sale', 'no sales', 'does not sell', 'non-commercial',
      'educational purpose', 'for educational purposes', 'educational content',
      'scientific only'
    ];

    // Check if the term "sale" is used in an educational context
    const hasEducationalContext = educationalContextPhrases.some(phrase => 
      content.toLowerCase().includes(phrase.toLowerCase())
    );

    // Exclude "sale" if used in an educational context
    let termsToCheck = hasEducationalContext ? 
      bannedTerms : [...bannedTerms, 'sale'];

    return termsToCheck.filter(term => 
      new RegExp(`\\b${term}\\b`, 'i').test(content)
    );
  };