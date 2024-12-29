export function ArrowRightIcon({
  color = 'currentColor',
  ...props
}: {
  className?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.2803 11.5021C19.5732 11.795 19.5732 12.2699 19.2803 12.5628L12.5628 19.2803C12.2699 19.5732 11.795 19.5732 11.5022 19.2803C11.2093 18.9874 11.2093 18.5125 11.5022 18.2196L16.9393 12.7825H5.19839C4.78418 12.7825 4.44839 12.4467 4.44839 12.0325C4.44839 11.6182 4.78418 11.2825 5.19839 11.2825H16.9393L11.5022 5.84527C11.2093 5.55238 11.2093 5.0775 11.5022 4.78461C11.795 4.49172 12.2699 4.49172 12.5628 4.78461L19.2803 11.5021Z"
        fill={color}
      />
    </svg>
  );
}
