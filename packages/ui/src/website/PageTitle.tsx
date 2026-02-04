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
    <div
      className={cn('py-12 border-b', className)}
      style={{
        backgroundColor: 'var(--background-color)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--heading-color)' }}>
            {title}
          </h1>

          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && (
                      <span className="mx-2" style={{ color: 'var(--default-color)' }}>
                        /
                      </span>
                    )}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="font-medium" style={{ color: 'var(--accent-color)' }}>
                        {crumb.label}
                      </span>
                    ) : (
                      <a
                        href={crumb.href}
                        className="transition-colors"
                        style={{ color: 'var(--default-color)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--accent-color)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--default-color)';
                        }}
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
