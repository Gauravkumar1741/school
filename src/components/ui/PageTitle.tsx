import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, action }) => {
  return (
    <div className="mb-6 md:mb-8 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageTitle;