import React from 'react';

const Logo = () => {
  return (
    <svg
      width="200"
      height="60"
      viewBox="0 0 380 100"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 hover:scale-105"
    >
      <defs>
        <linearGradient id="emartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>

      {/* Shopping cart icon */}
      <g transform="translate(15, 25)">
        <rect x="0" y="15" width="50" height="30" rx="5" fill="url(#emartGradient)" />
        <circle cx="12" cy="48" r="5" fill="#6366f1" />
        <circle cx="38" cy="48" r="5" fill="#9333ea" />
        <path
          d="M5 15 L10 0 H50 L55 15 Z"
          fill="url(#emartGradient)"
        />
      </g>

      {/* Text: "eMart" */}
      <text
        x="80"
        y="60"
        fontFamily="Segoe UI, sans-serif"
        fontSize="44"
        fontWeight="bold"
        fill="url(#emartGradient)"
      >
        E
      </text>
      <text
        x="110"
        y="60"
        fontFamily="Segoe UI, sans-serif"
        fontSize="44"
        fontWeight="bold"
        fill="#111827"
      >
        Mart
      </text>

      {/* Slogan */}
      <text
        x="85"
        y="80"
        fontFamily="Segoe UI, sans-serif"
        fontSize="14"
        fill="#6b7280"
      >
        Your One-Stop Digital Marketplace
      </text>
    </svg>
  );
};

export default Logo;
