// components/svg/faxSVG.tsx
import React from "react";

type FaxProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export function FaxSVG({ className = "", ...props }: FaxProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M6 8V4h9v4" />
      <path d="M6 18v2h12v-2" />
      <rect x="6" y="8" width="12" height="10" rx="2" />
      <path d="M18 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <path d="M8 12h6" />
      <path d="M8 15h4" />
    </svg>
  );
}
