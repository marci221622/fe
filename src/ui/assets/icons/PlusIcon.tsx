import { forwardRef } from 'react';

export const PlusIcon = forwardRef<HTMLElement, { className?: string; color?: string }>(
  ({ className, color = 'currentColor' }, ref) => {
    return (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // @ts-ignore
        ref={ref}
        className={className}
      >
        <path
          d="M12.898 5.5C12.4838 5.5 12.148 5.83579 12.148 6.25V11.25H7.14801C6.7338 11.25 6.39801 11.5858 6.39801 12C6.39801 12.4142 6.7338 12.75 7.14801 12.75H12.148V17.75C12.148 18.1642 12.4838 18.5 12.898 18.5C13.3122 18.5 13.648 18.1642 13.648 17.75V12.75H18.648C19.0622 12.75 19.398 12.4142 19.398 12C19.398 11.5858 19.0622 11.25 18.648 11.25H13.648V6.25C13.648 5.83579 13.3122 5.5 12.898 5.5Z"
          fill={color}
        />
      </svg>
    );
  },
);
