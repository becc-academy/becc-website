import React from 'react';

import { cn } from '../lib/utils';

export interface IBreadcrumb {
  label: string;
  href: string;
}

export interface IPageTitleProps {
  title: string;
  breadcrumbs?: IBreadcrumb[];
  className?: string;
}

export const PageTitle: React.FC<IPageTitleProps> = ({
  title,
  breadcrumbs = [],
  className = '',
}) => {
  return (
    <div className={cn('bg-gray-50 py-12 border-b border-gray-200', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>

          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-[#e95001] font-medium">{crumb.label}</span>
                    ) : (
                      <a
                        href={crumb.href}
                        className="text-gray-600 hover:text-[#e95001] transition-colors"
                      >
                        {crumb.label}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};
