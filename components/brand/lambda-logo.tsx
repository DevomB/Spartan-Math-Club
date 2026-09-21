type LambdaLogoProps = {
  className?: string;
};

/** Circular SMC mark. The lambda is the logo's only mathematical symbol. */
export function LambdaLogo({ className }: LambdaLogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="lambda-logo-ring"
        cx="50"
        cy="50"
        fill="none"
        r="44"
        strokeDasharray="246 31"
        strokeLinecap="round"
        strokeWidth="4.5"
        transform="rotate(-34 50 50)"
      />
      <path
        className="lambda-logo-symbol"
        d="M39 29c5-7 13-4 15 3M54 32 38 65M54 32c6 16 12 28 23 34"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9"
      />
      <text
        className="lambda-logo-text"
        x="50"
        y="85"
        textAnchor="middle"
      >
        SMC
      </text>
    </svg>
  );
}
