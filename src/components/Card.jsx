import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className }) => {
  return (
    <div className={twMerge(clsx("bg-white dark:bg-[#2a1d15] rounded-3xl shadow-soft border border-slate-100 dark:border-[#e8d9ce]/20 overflow-hidden", className))}>
      {children}
    </div>
  );
};
