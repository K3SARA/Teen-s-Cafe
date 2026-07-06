export default function Logo({ size = 44, className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Teen's Cafe logo"
    >
      <circle cx="100" cy="100" r="93" fill="none" stroke="var(--color-maroon)" strokeWidth="3" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="var(--color-maroon)" strokeWidth="1.5" />
      <text
        x="100"
        y="82"
        textAnchor="middle"
        fill="var(--color-maroon)"
        fontFamily="var(--font-logo)"
        fontSize="32"
      >
        Teen&apos;s
      </text>
      <line x1="70" y1="97" x2="130" y2="97" stroke="var(--color-maroon)" strokeWidth="1" opacity="0.6" />
      <text
        x="100"
        y="150"
        textAnchor="middle"
        fill="var(--color-maroon)"
        fontFamily="var(--font-logo)"
        fontSize="52"
      >
        Cafe
      </text>
    </svg>
  );
}
