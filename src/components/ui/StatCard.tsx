import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-700',
      iconBg: 'bg-primary-100',
    },
    accent: {
      bg: 'bg-accent-50',
      text: 'text-accent-700',
      iconBg: 'bg-accent-100',
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      iconBg: 'bg-green-100',
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      iconBg: 'bg-amber-100',
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      iconBg: 'bg-red-100',
    },
  };

  const classes = colorClasses[color];

  return (
    <div className="card">
      <div className="flex items-center">
        <div className={`${classes.iconBg} p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${classes.text}`} />
        </div>
        <h3 className="ml-3 text-lg font-medium text-slate-700">{title}</h3>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        {change && (
          <p className="mt-1 flex items-center text-sm">
            <span
              className={change.isPositive ? 'text-green-600' : 'text-red-600'}
            >
              {change.isPositive ? '↑' : '↓'} {change.value}
            </span>
            <span className="text-slate-500 ml-1">from last month</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;