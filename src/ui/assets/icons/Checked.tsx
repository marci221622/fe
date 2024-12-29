export function Checked({ color = 'currentColor', ...props }) {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.393709 3.23129C0.680269 2.98219 1.1022 2.98927 1.37985 3.23297L1.45179 3.30528L5.13552 7.54434L10.5565 0.84908C10.8172 0.527175 11.2894 0.477537 11.6114 0.73821C11.9064 0.977161 11.9727 1.39391 11.7809 1.70966L11.7222 1.79306L5.74368 9.17595C5.60768 9.3439 5.41407 9.43773 5.21492 9.45178L5.09314 9.45076L5.03293 9.44374C4.89836 9.42252 4.76895 9.36474 4.66089 9.27152L4.58411 9.19498L0.319721 4.28937C0.0479727 3.97676 0.0810983 3.50304 0.393709 3.23129Z"
        fill={color}
      />
    </svg>
  );
}

export function CheckedWithContainer({ color = 'currentColor', ...props }: { color?: string; className?: string }) {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.39371 11.2232C6.68027 10.9741 7.1022 10.9812 7.37985 11.2249L7.45179 11.2972L11.1355 15.5363L16.5565 8.84102C16.8172 8.51911 17.2894 8.46947 17.6114 8.73015C17.9064 8.9691 17.9727 9.38585 17.7809 9.7016L17.7222 9.785L11.7437 17.1679C11.6077 17.3358 11.4141 17.4297 11.2149 17.4437L11.0931 17.4427L11.0329 17.4357C10.8984 17.4145 10.7689 17.3567 10.6609 17.2635L10.5841 17.1869L6.31972 12.2813C6.04797 11.9687 6.0811 11.495 6.39371 11.2232Z"
        fill={color}
      />
    </svg>
  );
}
