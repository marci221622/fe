export function TelegramIcon({ className, color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0.00390625C18.6274 0.00390625 24 5.37649 24 12.0039C24 18.6313 18.6274 24.0039 12 24.0039C5.37258 24.0039 0 18.6313 0 12.0039C0 5.37649 5.37258 0.00390625 12 0.00390625ZM16.7543 7.20391C16.3195 7.21335 15.6432 7.43991 12.4259 8.75211C11.2955 9.21469 9.0443 10.1682 5.66271 11.6031C5.12165 11.8202 4.8318 12.0279 4.80281 12.2356C4.7545 12.6321 5.33421 12.7548 6.05883 12.9814C6.65786 13.1702 7.45012 13.3873 7.86557 13.3967C8.24238 13.4062 8.65783 13.2551 9.12159 12.9436C12.281 10.8573 13.9041 9.79999 14.0104 9.78111C14.0877 9.76223 14.1843 9.74334 14.2519 9.79999C14.3196 9.85663 14.3196 9.96991 14.3099 9.99823C14.252 10.2342 11.2858 12.8775 11.1119 13.0474C10.4549 13.7083 9.71095 14.1142 10.8607 14.8505C11.8558 15.4925 12.4259 15.8984 13.45 16.5498C14.0974 16.9652 14.6094 17.4561 15.2857 17.3994C15.5949 17.3711 15.9138 17.0879 16.078 16.2383C16.4645 14.2369 17.2181 9.88495 17.392 8.09129C17.4113 7.94025 17.392 7.742 17.3727 7.6476C17.3533 7.5532 17.3244 7.43047 17.2084 7.33607C17.0635 7.22279 16.8509 7.20391 16.7543 7.20391Z"
        fill={color}
      />
    </svg>
  );
}

export function TelegramStrokedIcon({ className, color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.3925 3.85478L2.47914 11.1085C1.83301 11.3702 1.86214 12.2948 2.52346 12.5152L6.78127 13.9345L8.28127 19.1585C8.47376 19.8446 9.42409 20.1404 9.98439 19.7001L12.7656 17.622L16.8316 20.6922C17.5061 21.1975 18.477 20.8297 18.6474 20.0043L21.7472 4.98379C21.9087 4.20146 21.133 3.55496 20.3925 3.85478ZM11.7165 16.8603L9.6523 15.3139C9.40761 15.1306 9.38327 14.7726 9.60089 14.5579L13.2659 10.9415L8.06235 13.8089L9.33615 18.2672C9.38472 18.4372 9.58956 18.5045 9.72943 18.3964L11.7165 16.8603ZM20.2662 5.45939L4.78399 11.5085C4.61076 11.5791 4.62051 11.8276 4.79874 11.8843L7.07033 12.6298C7.19524 12.6696 7.33077 12.6587 7.44775 12.5995L15.8906 8.26263C16.4567 7.97626 16.9969 8.68964 16.5678 9.15683L11.4656 14.6589C11.3654 14.7679 11.3814 14.9396 11.5 15.0283L17 19.1585C17.1464 19.2679 17.3568 19.1884 17.3944 19.0096L20.2662 5.45939Z"
        fill={color}
      />
      <path d="M9.34871 18.832L9.45355 14.9301L10.5625 15.6376L10.5 18.2672L9.34871 18.832Z" fill={color} />
    </svg>
  );
}

export function WhatsAppIcon({ className, color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4681 7.84881C10.1099 7.08985 9.6146 6.82759 8.8287 7.13234C8.04281 7.43708 7.51181 7.92981 7.15895 8.57136C6.8061 9.21292 6.75979 10.0221 6.82395 11.1128C6.8881 12.2034 7.93062 14.0158 8.25139 14.4809C8.57217 14.946 10.0157 16.7263 10.4808 17.1433C10.9459 17.5603 12.3573 18.7312 13.5121 18.9076C14.6669 19.084 15.2345 18.9299 15.7567 18.6202C16.2788 18.3106 16.7585 17.8248 17.0075 17.3027C17.2523 16.7892 17.3636 16.2146 16.7221 15.6693C16.3344 15.3398 15.9811 15.0683 15.6949 14.8484C15.5075 14.7044 15.3489 14.5825 15.2283 14.4809C14.793 14.1143 14.3253 13.8878 13.704 14.3848C13.4764 14.5669 13.2902 14.7318 13.1446 14.8609C13.0046 14.9849 12.902 15.0758 12.8361 15.1168C12.656 15.0014 12.2071 14.6699 11.8525 14.2667C11.4092 13.7628 10.881 13.1009 10.6017 12.597C10.3782 12.1938 10.2536 11.8947 10.2192 11.7955C10.3993 11.6275 10.819 11.2345 11.0571 11.0062C11.3546 10.7208 11.6096 10.3079 11.3849 9.76751C11.2052 9.33519 10.6946 8.28951 10.4681 7.84881ZM9.36908 8.12205L10.3527 10.1622C10.1908 10.3099 9.81718 10.6479 9.61802 10.8179C9.36908 11.0305 9.16264 11.2733 9.12621 11.583C9.08977 11.8927 9.20514 12.263 9.36908 12.6213C9.53302 12.9795 10.0734 13.8417 10.4984 14.3942C10.9235 14.9468 11.5489 15.5965 12.0164 15.9001C12.4839 16.2037 12.83 16.3858 13.249 16.1429C13.5841 15.9486 14.1537 15.4629 14.3966 15.2443L16.0967 16.5862C16.0602 16.7319 15.9072 17.0901 15.5866 17.3573L15.5778 17.3647C15.1823 17.6943 14.9382 17.8977 14.2933 17.8977C13.6436 17.8977 12.9757 17.6002 12.4596 17.2844C11.9435 16.9687 10.9963 16.2097 10.4134 15.5054C9.83054 14.8011 9.09585 13.8842 8.64046 12.9795C8.18507 12.0748 7.93006 11.3037 7.86934 10.4111C7.80862 9.51857 8.20329 8.91139 8.42187 8.70495C8.64046 8.4985 8.85905 8.31635 9.01691 8.23741C9.14321 8.17427 9.30431 8.13419 9.36908 8.12205Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22.995C17.5228 22.995 22 18.5179 22 12.995C22 7.47218 17.5228 2.99503 12 2.99503C6.47715 2.99503 2 7.47218 2 12.995C2 15.0802 2.63819 17.0163 3.72989 18.6186C3.80887 18.7345 3.83922 18.8773 3.81005 19.0145L3.00377 22.807C2.96655 22.9821 3.12001 23.1384 3.29576 23.1044L7.74875 22.2435C7.9457 22.2054 8.149 22.2288 8.33563 22.3023C9.47034 22.7494 10.7065 22.995 12 22.995ZM12 21.495C16.6944 21.495 20.5 17.6894 20.5 12.995C20.5 8.30061 16.6944 4.49503 12 4.49503C7.30558 4.49503 3.5 8.30061 3.5 12.995C3.5 14.8326 4.08312 16.534 5.0744 17.9243C5.25228 18.1737 5.32689 18.4853 5.25787 18.7838L4.73518 21.0446C4.70232 21.1868 4.82777 21.3151 4.97062 21.2855L7.88425 20.6818C8.10348 20.6364 8.33077 20.6677 8.53518 20.7591C9.59338 21.2321 10.766 21.495 12 21.495Z"
        fill={color}
      />
    </svg>
  );
}
