export function LogoSVG(): React.JSX.Element {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2652_3578)">
        <rect x="0.00100708" width="26" height="26" rx="5.85" fill="#F94F0D" />
        <rect width="26" height="26" transform="translate(0.00100708)" fill="white" />
        <rect x="7.80101" y="7.79999" width="10.4" height="10.4" fill="#F94F0D" />
      </g>
      <defs>
        <clipPath id="clip0_2652_3578">
          <rect x="0.00100708" width="26" height="26" rx="5.85" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CloseSVG({ onClick, className }: { onClick?: () => void; className?: string }): React.JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.714 5.28595C15.0395 5.61138 15.0395 6.13902 14.714 6.46446L11.1791 9.9994L14.714 13.5355C15.0395 13.861 15.0395 14.3886 14.714 14.714C14.3886 15.0395 13.861 15.0395 13.5355 14.714L10.0006 11.1779L6.46446 14.714C6.13902 15.0395 5.61138 15.0395 5.28595 14.714C4.96051 14.3886 4.96051 13.861 5.28595 13.5355L8.82207 9.9994L5.28595 6.46446C4.96051 6.13902 4.96051 5.61138 5.28595 5.28595C5.61138 4.96051 6.13902 4.96051 6.46446 5.28595L10.0006 8.82089L13.5355 5.28595C13.861 4.96051 14.3886 4.96051 14.714 5.28595Z"
        fill="#1B1B1B"
      />
    </svg>
  );
}

