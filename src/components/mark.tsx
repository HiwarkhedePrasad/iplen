export function Mark({
  className = "h-6 w-6",
  highlight = "var(--color-haldi)",
}: {
  className?: string;
  highlight?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="10.2" cy="10.2" r="6.6" />
      <path d="M15.2 15.2 20.4 20.4" strokeWidth={2.6} />
      <path
        d="M7.4 13a6.9 6.9 0 0 1 5.6-5.6A6.9 6.9 0 0 1 7.4 13Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M7.9 12.5 12.5 7.9"
        stroke={highlight}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
