
import { cn } from '@/lib/utils';
import React from 'react';

export interface ScientificHighlightedTextProps {
  content?: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
  level?: 'basic' | 'moderate' | 'advanced';
  highlightNumbers?: boolean;
  isBlock?: boolean;
}

export const ScientificHighlightedText = ({
  content,
  text,
  children,
  className = "",
  level = 'moderate',
  highlightNumbers = true,
  isBlock = false
}: ScientificHighlightedTextProps) => {
  const getTextStyle = () => {
    const baseStyle = "leading-relaxed tracking-wide";
    switch (level) {
      case 'advanced':
        return `${baseStyle} text-base font-normal text-gray-800 space-y-4`;
      case 'moderate':
        return `${baseStyle} text-base font-normal text-gray-700 space-y-3`;
      default:
        return `${baseStyle} text-lg font-light text-gray-600 space-y-2`;
    }
  };

  const highlightNumbersInText = (text: string) => {
    if (!highlightNumbers) return text;
    return text.split(/(\s*\d+%|\s*\d+(?:\.\d+)?(?:\s*(?:mg|g|mcg|UI|semaines|jours|heures|minutes|mois|ans))|\s*\d+\s*(?:à|vs|et)\s*\d+)/)
      .map((part, index) => {
        if (/\d+%|\d+(?:\.\d+)?(?:\s*(?:mg|g|mcg|UI|semaines|jours|heures|minutes|mois|ans))|\d+\s*(?:à|vs|et)\s*\d+/.test(part)) {
          return <span key={index} className="font-semibold text-indigo-700">{part}</span>;
        }
        return part;
      });
  };

  const renderContent = () => {
    const textContent = content || text || children;
    if (typeof textContent === 'string' && highlightNumbers) {
      return highlightNumbersInText(textContent);
    }
    return textContent;
  };

  if (isBlock) {
    return (
      <div className={cn("relative py-2", className)}>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-natural-600 rounded-full"></div>
        <div className={cn("pl-4", getTextStyle())}>{renderContent()}</div>
      </div>
    );
  }

  return (
    <div className={cn(getTextStyle(), className)}>
      {renderContent()}
    </div>
  );
};
