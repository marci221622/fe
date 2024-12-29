function CreatedIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 2.00195C20.1046 2.00195 21 2.89738 21 4.00195V14.002C21 15.1065 20.1046 16.002 19 16.002H18V20.002C18 21.1065 17.1046 22.002 16 22.002H5C3.89543 22.002 3 21.1065 3 20.002V4.00195C3 2.89738 3.89543 2.00195 5 2.00195H19ZM16.7557 3.50193L5.5 3.50195C4.98716 3.50195 4.56449 3.88799 4.50673 4.38533L4.5 4.50195V19.502C4.5 20.0148 4.88604 20.4375 5.38338 20.4952L5.5 20.502H15.6875C16.2003 20.502 16.623 20.1159 16.6808 19.6186L16.6875 19.502V14.5165L16.692 14.516L16.6927 4.00195C16.6927 3.8293 16.7146 3.66175 16.7557 3.50193ZM9.25 15.002C9.66421 15.002 10 15.3377 10 15.752C10 16.1662 9.66421 16.502 9.25 16.502H6.75C6.33579 16.502 6 16.1662 6 15.752C6 15.3377 6.33579 15.002 6.75 15.002H9.25ZM18.7611 3.5076C18.3865 3.5076 18.077 3.78591 18.028 4.14701L18.0213 4.2474L18.021 14.516L18.5 14.5165C19.0128 14.5165 19.4355 14.1305 19.4933 13.6331L19.5 13.5165L19.5009 4.2474C19.5009 3.83882 19.1696 3.5076 18.7611 3.5076ZM14.25 11.002C14.6642 11.002 15 11.3377 15 11.752C15 12.1662 14.6642 12.502 14.25 12.502H6.75C6.33579 12.502 6 12.1662 6 11.752C6 11.3377 6.33579 11.002 6.75 11.002H14.25ZM11.25 7.00195C11.6642 7.00195 12 7.33774 12 7.75195C12 8.16617 11.6642 8.50195 11.25 8.50195H6.75C6.33579 8.50195 6 8.16617 6 7.75195C6 7.33774 6.33579 7.00195 6.75 7.00195H11.25Z"
        fill={color}
      />
    </svg>
  );
}

function PackingIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4.25195C13.6568 4.25195 15 5.5951 15 7.25195C15 8.36708 14.3916 9.3401 13.4886 9.85717L13.5 9.84597C13.1549 10.1252 12.9345 10.5483 12.9345 11.023C12.9345 11.4977 13.1549 11.9208 13.4991 12.1957L13.4981 12.2L20.657 17.0017C21.345 17.4631 21.5287 18.395 21.0672 19.0829C20.7886 19.4982 20.3215 19.7474 19.8215 19.7474H4.18707C3.35865 19.7474 2.68707 19.0758 2.68707 18.2474C2.68707 17.7476 2.93599 17.2806 3.35093 17.002L11.3067 11.6597C11.2732 11.492 11.2555 11.3182 11.2555 11.1392C11.2555 10.0537 11.832 9.10278 12.6956 8.57609L12.6991 8.57795L12.8111 8.51397C13.2255 8.24706 13.5 7.78156 13.5 7.25195C13.5 6.42353 12.8284 5.75195 12 5.75195C11.1931 5.75195 10.535 6.38911 10.5013 7.18775L10.5072 7.26031C10.5072 7.67452 10.1714 8.01031 9.75718 8.01031C9.34297 8.01031 9.00718 7.67452 9.00718 7.26031C9.00718 7.2576 9.0072 7.2549 9.00723 7.2522L8.99998 7.25195C8.99998 5.5951 10.3431 4.25195 12 4.25195ZM11.814 13.3567L11.7276 13.4011L4.89278 17.8014C4.82131 17.8474 4.77811 17.9266 4.77811 18.0116C4.77811 18.13 4.86035 18.2291 4.97079 18.255L5.02811 18.2616H18.8837C18.9682 18.2616 19.047 18.2189 19.0931 18.1482C19.156 18.0518 19.1438 17.9281 19.071 17.846L19.0202 17.8022L12.2713 13.4026C12.1338 13.3129 11.963 13.2976 11.814 13.3567Z"
        fill={color}
      />
    </svg>
  );
}

function ReadyIcon({ color = 'currentColor', className }: { color?: string; className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9913 2.77295C18.6574 2.77295 19.2064 3.29524 19.2397 3.96049L19.7701 14.5779L20.0245 14.5115C20.959 14.2641 21.9192 14.8124 22.1811 15.7429L22.2007 15.8127C22.4626 16.7435 22.0212 17.7284 21.152 18.1522L15.2745 21.0181C14.2855 21.5003 13.1415 21.5538 12.1117 21.166L8.96318 19.9803C8.62521 19.8531 8.26704 19.7879 7.9059 19.7879L5.11442 19.7886C4.9415 20.0874 4.61837 20.2884 4.24828 20.2884H2.54606C2.13961 20.2884 1.81012 19.959 1.81012 19.5525C1.81012 19.1461 2.13961 18.8166 2.54606 18.8166H3.51132C3.64939 18.8166 3.76132 18.7046 3.76132 18.5666V13.0414C3.76132 12.9033 3.64939 12.7914 3.51132 12.7914H2.58163C2.15554 12.7914 1.81012 12.446 1.81012 12.0199C1.81012 11.5938 2.15554 11.2484 2.58163 11.2484H4.24828C4.71546 11.2484 5.10781 11.5688 5.21764 12.0018L6.29412 12.0009L6.73459 3.95475C6.77081 3.29188 7.31887 2.77295 7.98273 2.77295H17.9913ZM5.24812 13.5344V18.2904L8.3037 18.2914C8.67296 18.2914 9.03905 18.3596 9.38356 18.4925L12.4925 19.6919C13.2778 19.9949 14.1542 19.9541 14.9079 19.5793L20.55 16.7741C20.7401 16.6796 20.8253 16.4547 20.7455 16.258C20.6645 16.0582 20.4484 15.9488 20.2394 16.0017L16.2184 17.02C15.5764 17.1826 14.9167 17.2648 14.2544 17.2648H12.7326L12.0633 17.7516C11.746 17.9824 11.3044 17.9298 11.0503 17.6308C10.7979 17.334 10.8225 16.8914 11.1064 16.6244L11.2999 16.4424C11.7496 16.0193 12.3438 15.7838 12.9612 15.7838H14.9116C15.2243 15.7838 15.4778 15.5303 15.4778 15.2176C15.4778 14.9049 15.2243 14.6514 14.9116 14.6514H13.2011C12.7827 14.6514 12.3689 14.5638 11.9863 14.3944L10.2398 13.6209C10.1123 13.5645 9.97435 13.5353 9.83488 13.5353L5.24812 13.5344ZM17.5511 4.26076H8.46652C8.33407 4.26076 8.22461 4.36406 8.21694 4.49628L7.78012 12.0019L9.86435 12.002C10.135 12.002 10.4028 12.0569 10.6516 12.1634L12.7822 13.0758C12.9066 13.129 13.0405 13.1565 13.1758 13.1565H14.9539C15.8645 13.1565 16.6601 13.7716 16.8894 14.6528L17.0571 15.2971L18.2751 14.9739L17.8009 4.49945C17.7948 4.36591 17.6848 4.26076 17.5511 4.26076ZM16.1977 5.14652C16.612 5.14652 16.9477 5.48231 16.9477 5.89652C16.9477 5.92728 16.9459 5.95761 16.9423 5.9874L16.9478 5.988C16.6466 8.9673 15.1786 11.7046 13.0052 11.7046C10.8322 11.7046 9.36422 8.96792 9.06272 5.989L9.06446 5.98843L9.06045 5.91044C9.06045 5.53075 9.34261 5.21695 9.70868 5.16729L9.81045 5.16044C10.1901 5.16044 10.5039 5.4426 10.5536 5.80867L10.5551 5.83195L10.5638 5.83197C10.8128 8.00822 11.8108 10.0555 13.004 10.0555C14.1973 10.0555 15.1954 8.0076 15.4443 5.83097C15.4836 5.44759 15.8055 5.14652 16.1977 5.14652Z"
        fill={color}
      />
    </svg>
  );
}

export function CompletedIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.39377 10.232C6.68033 9.98292 7.10226 9.99 7.37991 10.2337L7.45185 10.306L11.1356 14.5451L16.5566 7.84981C16.8172 7.52791 17.2895 7.47827 17.6114 7.73894C17.9065 7.97789 17.9728 8.39465 17.781 8.71039L17.7223 8.79379L11.7437 16.1767C11.6077 16.3446 11.4141 16.4385 11.215 16.4525L11.0932 16.4515L11.033 16.4445C10.8984 16.4233 10.769 16.3655 10.661 16.2723L10.5842 16.1957L6.31978 11.2901C6.04803 10.9775 6.08116 10.5038 6.39377 10.232Z"
        fill={color}
      />
    </svg>
  );
}

export const clickAndCollectIcons = {
  ReadyIcon,
  PackingIcon,
  CreatedIcon,
  CompletedIcon,
};
