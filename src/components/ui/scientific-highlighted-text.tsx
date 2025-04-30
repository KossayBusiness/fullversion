
import React from 'react';

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

export const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  text, 
  className = "" 
}) => {
  // If the text contains scientific term markup in format [[termId:termName]]
  const containsScientificMarkup = text && text.includes('[[') && text.includes(']]');
  
  if (!containsScientificMarkup) {
    return <span className={`text-gray-700 ${className}`}>{text}</span>;
  }

  // Process the text to render scientific terms with appropriate styling
  const processText = () => {
    if (!text) return [];
    
    const parts = [];
    let lastIndex = 0;
    
    // Find all instances of [[termId:termName]]
    const regex = /\[\[([^:]+):([^\]]+)\]\]/g;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }
      
      // Add the scientific term
      const termId = match[1];
      const termName = match[2];
      
      parts.push({
        type: 'term',
        id: termId,
        name: termName
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }
    
    return parts;
  };
  
  const renderParts = () => {
    const parts = processText();
    
    return parts.map((part, index) => {
      if (part.type === 'text') {
        return <React.Fragment key={index}>{part.content}</React.Fragment>;
      } else if (part.type === 'term') {
        return (
          <span 
            key={index} 
            className="font-semibold text-primary underline decoration-dotted underline-offset-2 cursor-help"
            title={`Scientific term: ${part.name}`}
          >
            {part.name}
          </span>
        );
      }
      return null;
    });
  };
  
  return (
    <span className={`${className}`}>
      {renderParts()}
    </span>
  );
};

export default ScientificHighlightedText;
