import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 40, showText = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Blue Rounded Square (Top Left) */}
        <rect
          x="10"
          y="15"
          width="45"
          height="45"
          rx="12"
          fill="#3B82F6"
        />
        {/* Green Circle (Top Right) */}
        <circle
          cx="65"
          cy="30"
          r="22"
          fill="#10B981"
        />
        {/* Red Bottom Shape (Heart Point) */}
        <path
          d="M21 50C21 50 21 85 55 85C89 85 89 50 89 50H21Z"
          fill="#EF4444"
          style={{ transform: 'translateY(5px)' }}
        />
        {/* Refining the Red Shape to be more like a heart bottom */}
        <path
          d="M17 55C17 55 17 85 52.5 85C88 85 88 55 88 55H17Z"
          fill="#EF4444"
        />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-brand-black font-display font-bold text-2xl">Lovable</span>
          <span className="text-brand-black font-display font-bold text-2xl">Learner</span>
        </div>
      )}
    </div>
  );
};
