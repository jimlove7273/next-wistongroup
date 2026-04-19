// components/svg/Phone.tsx
import React from "react";

type LocationProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export function LocationSVG({ className = "", ...props }: LocationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-map-pin w-4 h-4 text-[#C8102E]"
      aria-hidden="true"
      x-file-name="Footer"
      x-line-number="32"
      x-column="53"
      x-component="MapPin"
      x-id="Footer_32_53"
      x-dynamic="false"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}
