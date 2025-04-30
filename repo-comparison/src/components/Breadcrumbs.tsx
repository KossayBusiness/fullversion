
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

interface BreadcrumbsProps {
  customPaths?: {
    path: string;
    label: string;
  }[];
}

interface PathSegment {
  path: string;
  label: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customPaths }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);

  // Path mapping for human-readable labels
  const pathMapping: Record<string, string> = {
    'about': t('About Us'),
    'impact': t('Our Impact'),
    'articles': t('Articles'),
    'nos-recherches': t('Our Research'),
    'bibliotheque-scientifique': t('Scientific Publications'),
    'labo-solutions': t('Lab Solutions'),
    'nutrition': t('Nutrition'),
    'profile-sante': t('Health Profile'),
    'quiz': t('Interactive Quiz'),
    'contact': t('Contact'),
    'privacy-policy': t('Privacy Policy'),
    'terms-of-use': t('Terms of Use'),
    'accessibility': t('Accessibility'),
    'scientific-methodology': t('Scientific Methodology'),
    'site-map': t('Site Map'),
    'support': t('Support Our Research'),
  };

  useEffect(() => {
    if (customPaths) {
      setPathSegments(customPaths);
      return;
    }

    // Split the path and create segments
    const pathParts = location.pathname.split('/').filter(Boolean);
    const segments: PathSegment[] = [];

    let currentPath = '';
    pathParts.forEach(part => {
      currentPath += `/${part}`;
      const label = pathMapping[part] || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
      segments.push({
        path: currentPath,
        label,
      });
    });

    setPathSegments(segments);
  }, [location.pathname, customPaths]);

  if (pathSegments.length === 0 && !customPaths) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-2 text-sm mb-2">
      <ol className="flex flex-wrap items-center space-x-1">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center"
          >
            <Home className="h-3.5 w-3.5 mr-1" />
            {t('Home')}
          </Link>
          {pathSegments.length > 0 && (
            <ChevronRight className="h-3.5 w-3.5 mx-2 text-slate-400" />
          )}
        </li>
        
        {pathSegments.map((segment, index) => (
          <li key={segment.path} className="flex items-center">
            {index === pathSegments.length - 1 ? (
              <span className="text-sm font-medium text-slate-700">
                {segment.label}
              </span>
            ) : (
              <>
                <Link 
                  to={segment.path} 
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  {segment.label}
                </Link>
                <ChevronRight className="h-3.5 w-3.5 mx-2 text-slate-400" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
