
/**
 * Translation Consistency Checker
 * 
 * This script scans the codebase for French text and medical/scientific terms
 * to help ensure complete and consistent translation.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Common French words to look for (excluding scientific terms)
const FRENCH_INDICATORS = [
  // Articles and determiners
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de la', 'au', 'aux',
  // Common verbs
  'est', 'sont', 'être', 'avoir', 'faire', 'voir', 'aller', 'venir',
  'peut', 'doit', 'faut', 'veut', 'veux', 'pouvez',
  // Pronouns
  'notre', 'votre', 'leur', 'nous', 'vous', 'ils', 'elles', 'il', 'elle', 'ce', 'cette',
  // Prepositions
  'pour', 'avec', 'sans', 'dans', 'sur', 'sous', 'entre', 'parmi', 'chez', 'vers',
  // Conjunctions
  'et', 'ou', 'mais', 'donc', 'car', 'ni', 'que', 'quoi', 'comment', 'quand', 'si',
  // Common phrases
  'bonjour', 'merci', 'salut', 'oui', 'non', 'peut-être',
  // Page titles and navigation
  'accueil', 'profil', 'contact', 'à propos', 'recherche',
  'bienvenue', 'connexion', 'inscription', 'commencer',
  // Health-related
  'santé', 'profil santé', 'objectifs', 'symptômes',
  // Specific to the site
  'bibliothèque scientifique', 'nos recherches', 'labo solutions'
];

// Scientific terms we might keep in French or need special translation attention
const MEDICAL_TERMS = [
  'vitamine', 'magnésium', 'probiotiques', 'oméga', 'inflammation',
  'métabolisme', 'digestion', 'système immunitaire', 'microbiome',
  'cortisol', 'mélatonine', 'sérotonine', 'homéostasie', 'antioxydant',
  'nutrition', 'nutriment', 'carence', 'compléments', 'suppléments'
];

// Files and directories to ignore
const IGNORE_DIRS = [
  'node_modules', 'dist', 'build', '.git', 
  'attached_assets', 'repo-comparison'
];

// File extensions to scan
const SCAN_EXTENSIONS = [
  '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html', '.css'
];

// Colors for console output
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Results tracking
const results = {
  scannedFiles: 0,
  potentialFrenchContent: [],
  medicalTerms: [],
  errors: []
};

// Scan a single file
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const fileIssues = [];
    const fileMedicalTerms = new Set();
    
    // Skip translation files themselves to avoid false positives
    if (filePath.includes('Language') || filePath.includes('translation') || 
        filePath.includes('i18n') || filePath.includes('check-translations.js')) {
      if (filePath.includes('check-translations.js')) {
        // Only scan this file for actual bugs, not for the French words it contains as indicators
        return;
      }
    }
    
    lines.forEach((line, index) => {
      // Skip comment lines to reduce false positives
      if (line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*')) {
        return;
      }
      
      // Skip import statements
      if (line.trim().startsWith('import ') || line.trim().startsWith('export ')) {
        return;
      }
      
      // Check for French words - use word boundaries to avoid partial matches
      for (const word of FRENCH_INDICATORS) {
        // Create regex with word boundaries, case insensitive
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(line)) {
          // Avoid matches in variable names, props, etc.
          const isCodeContext = line.includes('=') || line.includes('{') || 
                                line.includes('function') || line.includes('=>');
          
          // Skip if it looks like a code definition rather than content
          if (isCodeContext && (line.includes(`'${word}'`) || line.includes(`"${word}"`))) {
            continue;
          }
          
          fileIssues.push({
            line: index + 1,
            content: line.trim(),
            word,
            type: 'French'
          });
          break; // One match per line is enough
        }
      }
      
      // Check for medical terms
      for (const term of MEDICAL_TERMS) {
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        if (regex.test(line)) {
          fileMedicalTerms.add(term);
        }
      }
    });
    
    if (fileIssues.length > 0) {
      results.potentialFrenchContent.push({
        file: filePath,
        issues: fileIssues
      });
    }
    
    if (fileMedicalTerms.size > 0) {
      results.medicalTerms.push({
        file: filePath,
        terms: Array.from(fileMedicalTerms)
      });
    }
    
    results.scannedFiles++;
  } catch (error) {
    results.errors.push({
      file: filePath,
      error: error.message
    });
  }
}

// Scan a directory recursively
function scanDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        scanDirectory(filePath);
      }
    } else if (stats.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (SCAN_EXTENSIONS.includes(ext)) {
        scanFile(filePath);
      }
    }
  }
}

// Print the results
function printResults() {
  console.log(`\n${COLORS.bright}${COLORS.blue}=============== Translation Check Results ===============${COLORS.reset}\n`);
  console.log(`${COLORS.green}Scanned ${results.scannedFiles} files${COLORS.reset}\n`);
  
  if (results.potentialFrenchContent.length === 0) {
    console.log(`${COLORS.green}✅ No potential French content found${COLORS.reset}\n`);
  } else {
    console.log(`${COLORS.yellow}⚠️  Potential French content found in ${results.potentialFrenchContent.length} files:${COLORS.reset}\n`);
    
    results.potentialFrenchContent.forEach(fileResult => {
      console.log(`${COLORS.bright}${fileResult.file}${COLORS.reset}`);
      fileResult.issues.slice(0, 5).forEach(issue => {
        console.log(`  Line ${issue.line}: ${COLORS.yellow}${issue.word}${COLORS.reset} in "${issue.content.substring(0, 80)}${issue.content.length > 80 ? '...' : ''}"`);
      });
      if (fileResult.issues.length > 5) {
        console.log(`  ... and ${fileResult.issues.length - 5} more instances`);
      }
      console.log('');
    });
  }
  
  if (results.medicalTerms.length > 0) {
    console.log(`${COLORS.magenta}🔬 Medical/Scientific terms found in ${results.medicalTerms.length} files:${COLORS.reset}\n`);
    
    // Count term occurrences
    const termCounts = {};
    results.medicalTerms.forEach(fileResult => {
      fileResult.terms.forEach(term => {
        termCounts[term] = (termCounts[term] || 0) + 1;
      });
    });
    
    // Print most common terms
    console.log(`${COLORS.bright}Most common medical terms:${COLORS.reset}`);
    Object.entries(termCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([term, count]) => {
        console.log(`  ${COLORS.magenta}${term}${COLORS.reset}: ${count} occurrences`);
      });
    console.log('');
    
    // Print a few example files
    console.log(`${COLORS.bright}Example files with medical terms:${COLORS.reset}`);
    results.medicalTerms.slice(0, 5).forEach(fileResult => {
      console.log(`  ${fileResult.file}: ${fileResult.terms.join(', ')}`);
    });
    console.log('');
  }
  
  if (results.errors.length > 0) {
    console.log(`${COLORS.red}❌ Errors occurred while scanning ${results.errors.length} files:${COLORS.reset}\n`);
    results.errors.forEach(error => {
      console.log(`  ${error.file}: ${error.error}`);
    });
    console.log('');
  }
  
  console.log(`${COLORS.bright}${COLORS.blue}====================== Summary =======================${COLORS.reset}\n`);
  console.log(`${COLORS.green}Scanned: ${results.scannedFiles} files${COLORS.reset}`);
  console.log(`${COLORS.yellow}Potential French: ${results.potentialFrenchContent.length} files${COLORS.reset}`);
  console.log(`${COLORS.magenta}Medical terms: ${results.medicalTerms.length} files${COLORS.reset}`);
  console.log(`${COLORS.red}Errors: ${results.errors.length} files${COLORS.reset}\n`);
  
  if (results.potentialFrenchContent.length === 0) {
    console.log(`${COLORS.green}✅ All content appears to be properly translated to English!${COLORS.reset}\n`);
  } else {
    console.log(`${COLORS.yellow}⚠️  Translation may not be complete. Review the files listed above.${COLORS.reset}\n`);
    console.log(`${COLORS.cyan}Tip: Use the termTranslator utility to ensure consistent terminology:${COLORS.reset}`);
    console.log(`  import { translateMedicalText } from '@/utils/termTranslator';`);
    console.log(`  const translatedText = translateMedicalText(frenchText, 'en');\n`);
  }
}

// Main execution
console.log(`${COLORS.bright}${COLORS.blue}Starting Translation Check...${COLORS.reset}\n`);

try {
  // Start from the src directory
  scanDirectory('src');
  printResults();
  
  // Exit with error code if potential French content was found
  process.exit(results.potentialFrenchContent.length > 0 ? 1 : 0);
} catch (error) {
  console.error(`${COLORS.red}Error during scan: ${error.message}${COLORS.reset}`);
  process.exit(1);
}
