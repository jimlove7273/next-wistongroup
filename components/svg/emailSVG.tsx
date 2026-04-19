// components/svg/Phone.tsx
import React from "react";

type EmailProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export function EmailSVG({ className = "", ...props }: EmailProps) {
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
      className="lucide lucide-mail w-4 h-4 text-[#C8102E]"
      aria-hidden="true"
      x-file-name="Footer"
      x-line-number="34"
      x-column="53"
      x-component="Mail"
      x-id="Footer_34_53"
      x-dynamic="false"
    >
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    </svg>
  );
}
