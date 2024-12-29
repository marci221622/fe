import { ComponentPropsWithoutRef, forwardRef } from 'react';

type Props = {
  active?: boolean;
  color?: string;
} & ComponentPropsWithoutRef<'svg'>;

export const StarIcon = forwardRef<SVGSVGElement, Props>(({ id, active, color = 'currentColor', ...props }, ref) => {
  const styles = props.onClick ? { cursor: 'pointer' } : {};

  if (!active) {
    return (
      <svg
        id={id}
        ref={ref}
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        style={styles}
      >
        <g clipPath="url(#clip0_2639_2126)">
          <g clipPath="url(#clip1_2639_2126)">
            <path
              fill={color}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1278 9.54759L12.6003 2.27637L10.0728 9.54759L2.37646 9.70443L8.51078 14.3551L6.28163 21.7233L12.6003 17.3264L18.919 21.7233L16.6899 14.3551L22.8242 9.70443L15.1278 9.54759ZM19.2034 10.8809L14.2327 10.7796L12.6003 6.08351L10.968 10.7796L5.99728 10.8809L9.9591 13.8846L8.51942 18.6433L12.6003 15.8035L16.6812 18.6433L15.2415 13.8846L19.2034 10.8809Z"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_2639_2126">
            <rect width="24" height="24" fill="white" transform="translate(0.600098)" />
          </clipPath>
          <clipPath id="clip1_2639_2126">
            <rect width="24" height="24" fill="white" transform="translate(0.600098)" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      id={id}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={styles}
    >
      <g clipPath="url(#clip0_2639_2188)">
        <g clipPath="url(#clip1_2639_2188)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.1278 9.54759L12.6003 2.27637L10.0728 9.54759L2.37646 9.70443L8.51078 14.3551L6.28163 21.7233L12.6003 17.3264L18.919 21.7233L16.6899 14.3551L22.8242 9.70443L15.1278 9.54759Z"
            fill={color}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2639_2188">
          <rect width="24" height="24" fill="white" transform="translate(0.600098)" />
        </clipPath>
        <clipPath id="clip1_2639_2188">
          <rect width="24" height="24" fill="white" transform="translate(0.600098)" />
        </clipPath>
      </defs>
    </svg>
  );
});
