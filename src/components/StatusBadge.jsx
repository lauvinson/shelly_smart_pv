import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const StatusBadge = ({ status, className }) => {
  const styles = {
    Online: 'bg-green-100 text-green-700',
    Running: 'bg-green-100 text-green-700',
    Offline: 'bg-red-100 text-red-700',
    Stopped: 'bg-slate-100 text-slate-500',
    Warning: 'bg-yellow-100 text-yellow-800',
    Critical: 'bg-red-100 text-red-700',
    Major: 'bg-orange-100 text-orange-800',
    Minor: 'bg-yellow-100 text-yellow-800',
    Info: 'bg-blue-100 text-blue-800',
    Standby: 'bg-green-50 text-green-600',
  };

  const dotColors = {
    Online: 'bg-green-600',
    Running: 'bg-green-600',
    Offline: 'bg-red-600',
    Stopped: 'bg-slate-400',
    Warning: 'bg-yellow-600',
    Critical: 'bg-red-600',
    Major: 'bg-orange-600',
    Minor: 'bg-yellow-600',
    Info: 'bg-blue-600',
    Standby: 'bg-green-500',
  };

  const currentStyle = styles[status] || 'bg-gray-100 text-gray-800';
  const dotColor = dotColors[status] || 'bg-gray-500';

  return (
    <span className={twMerge(clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide", currentStyle, className))}>
      <span className={clsx("size-1.5 rounded-full", dotColor)}></span>
      {status}
    </span>
  );
};
