type Props = {
  className?: string;
  color?: string;
  onClick?: React.MouseEventHandler<any>;
};

export function CloseIcon({ color = 'currentColor', ...props }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0105 5.99067C18.3034 6.28356 18.3034 6.75843 18.0105 7.05133L13.0608 12.0011L18.0105 16.9508C18.3034 17.2437 18.3034 17.7186 18.0105 18.0115C17.7176 18.3044 17.2427 18.3044 16.9498 18.0115L12.0001 13.0617L7.05035 18.0115C6.75746 18.3044 6.28258 18.3044 5.98969 18.0115C5.6968 17.7186 5.6968 17.2437 5.98969 16.9508L10.9394 12.0011L5.98969 7.05133C5.6968 6.75843 5.6968 6.28356 5.98969 5.99067C6.28258 5.69777 6.75746 5.69777 7.05035 5.99067L12.0001 10.9404L16.9498 5.99067C17.2427 5.69777 17.7176 5.69777 18.0105 5.99067Z"
        fill={color}
      />
    </svg>
  );
}

export function CloseFilledIcon({ color = 'currentColor', className, ...props }: Props) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16.0029C12.4183 16.0029 16 12.4212 16 8.00293C16 3.58465 12.4183 0.00292969 8 0.00292969C3.58172 0.00292969 0 3.58465 0 8.00293C0 12.4212 3.58172 16.0029 8 16.0029ZM11.4228 5.43585C11.6591 5.19955 11.6591 4.81644 11.4228 4.58015C11.1865 4.34386 10.8034 4.34386 10.5671 4.58015L8.00043 7.14681L5.43291 4.58015C5.19662 4.34386 4.81351 4.34386 4.57722 4.58015C4.34093 4.81644 4.34093 5.19955 4.57722 5.43585L7.14473 8.0025L4.57722 10.57C4.34093 10.8063 4.34093 11.1894 4.57722 11.4257C4.81351 11.662 5.19662 11.662 5.43291 11.4257L8.00043 8.8582L10.5671 11.4257C10.8034 11.662 11.1865 11.662 11.4228 11.4257C11.6591 11.1894 11.6591 10.8063 11.4228 10.57L8.85612 8.0025L11.4228 5.43585Z"
        fill={color}
        fillOpacity="0.6"
      />
    </svg>
  );
}

export function CloseIconStroked({ color = 'currentColor', className, ...props }: Props) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.1129 5.9896C18.4058 6.28249 18.4058 6.75736 18.1129 7.05026L13.1631 12L18.1129 16.9498C18.4058 17.2426 18.4058 17.7175 18.1129 18.0104C17.82 18.3033 17.3451 18.3033 17.0522 18.0104L12.1025 13.0607L7.15271 18.0104C6.85981 18.3033 6.38494 18.3033 6.09205 18.0104C5.79915 17.7175 5.79915 17.2426 6.09205 16.9498L11.0418 12L6.09205 7.05026C5.79915 6.75736 5.79915 6.28249 6.09205 5.9896C6.38494 5.6967 6.85981 5.6967 7.15271 5.9896L12.1025 10.9393L17.0522 5.9896C17.3451 5.6967 17.82 5.6967 18.1129 5.9896Z"
        fill={color}
      />
    </svg>
  );
}