import React from "react";

const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#gradient)" />
      <rect x="16" y="20" width="8" height="16" rx="1" fill="white" />
      <rect x="28" y="16" width="8" height="24" rx="1" fill="white" />
      <rect x="40" y="28" width="8" height="12" rx="1" fill="white" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFA500" />
          <stop offset="0.5" stopColor="#FF6B6B" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DashboardIcon;
