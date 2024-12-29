export function OrdersIcon({ color = 'currentColor', className }: { color?: string; className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.20486 11.5527H9.79514L10.2047 11.5589C10.8923 11.5814 11.2492 11.6653 11.5566 11.805L11.7211 11.8867C12.1285 12.1045 12.4482 12.4243 12.6661 12.8317L12.7083 12.9133L12.7845 13.0814C12.8904 13.3422 12.9587 13.6532 12.9862 14.1685L12.9985 14.544C12.9995 14.6122 13 14.6833 13 14.7576V17.7952L12.9985 18.0088L12.9862 18.3843C12.9587 18.8996 12.8904 19.2105 12.7845 19.4713L12.7083 19.6394C12.6947 19.6668 12.6806 19.6939 12.6661 19.7211C12.4482 20.1285 12.1285 20.4482 11.7211 20.6661L11.6394 20.7083L11.4713 20.7845C11.2105 20.8904 10.8996 20.9587 10.3843 20.9862L10.0088 20.9985C9.94057 20.9995 9.86944 21 9.79514 21H5.20486L4.99124 20.9985L4.61574 20.9862C4.10045 20.9587 3.78948 20.8904 3.5287 20.7845L3.36059 20.7083C3.33325 20.6947 3.3061 20.6806 3.27894 20.6661C2.87154 20.4482 2.5518 20.1285 2.33392 19.7211L2.2917 19.6394L2.21552 19.4713C2.10958 19.2105 2.04132 18.8996 2.01381 18.3843L2.00154 18.0088C2.00052 17.9406 2 17.8694 2 17.7952L2.00154 14.544L2.01381 14.1685C2.04132 13.6532 2.10958 13.3422 2.21552 13.0814L2.2917 12.9133C2.30532 12.886 2.31939 12.8588 2.33392 12.8317C2.5518 12.4243 2.87154 12.1045 3.27894 11.8867L3.44342 11.805C3.75084 11.6653 4.10766 11.5814 4.79529 11.5589L5.20486 11.5527ZM10.2181 13.05H4.78194C4.33618 13.05 4.17454 13.0964 4.01158 13.1836C3.84861 13.2707 3.72072 13.3986 3.63357 13.5616C3.55731 13.7042 3.51224 13.8458 3.50216 14.1776L3.5 14.332V18.2181C3.5 18.6638 3.54641 18.8255 3.63357 18.9884C3.72072 19.1514 3.84861 19.2793 4.01158 19.3664C4.15417 19.4427 4.29575 19.4878 4.62754 19.4978L4.78194 19.5H10.2181C10.6638 19.5 10.8255 19.4536 10.9884 19.3664C11.1514 19.2793 11.2793 19.1514 11.3664 18.9884C11.4427 18.8458 11.4878 18.7043 11.4978 18.3725L11.5 18.2181V14.332C11.5 13.8862 11.4536 13.7246 11.3664 13.5616C11.2793 13.3986 11.1514 13.2707 10.9884 13.1836C10.8255 13.0964 10.6638 13.05 10.2181 13.05ZM13.587 2.00098C16.0246 2.00098 17.3905 4.46417 18.0578 7.02158L19.1698 7.02106C20.21 7.02106 21.0765 7.81838 21.1629 8.85496L21.8295 16.855C21.9213 17.9557 21.1033 18.9224 20.0025 19.0141C19.9473 19.0188 19.8919 19.0211 19.8365 19.0211H14.7296L14.6351 19.0366C14.2568 19.0697 13.9196 18.816 13.8383 18.4557L13.8226 18.3549C13.7865 17.9422 14.0917 17.5785 14.5043 17.5424L14.5766 17.5395L14.576 17.5111L19.6756 17.5118C19.6991 17.5118 19.7226 17.5107 19.746 17.5085C20.124 17.4729 20.4099 17.1625 20.425 16.7934L20.4223 16.6914L19.7148 9.19139C19.6785 8.80618 19.355 8.51183 18.9681 8.51183L18.3713 8.51144C18.4409 8.93761 18.4924 9.35311 18.5275 9.74628C18.5363 9.78055 18.5422 9.81693 18.5454 9.85418C18.5815 10.2668 18.2763 10.6306 17.8637 10.6667C17.4854 10.6998 17.1482 10.4461 17.0668 10.0857L17.0504 9.97582C17.0111 9.53684 16.9477 9.03614 16.8552 8.51214L10.3212 8.51163C10.2359 9.00251 10.1759 9.47317 10.137 9.89216C10.1388 9.92683 10.1382 9.96224 10.1351 9.99801C10.099 10.4107 9.73522 10.7159 9.32258 10.6798C8.94433 10.6467 8.65632 10.3383 8.63876 9.96926L8.64 9.88398L8.65605 9.69949C8.69041 9.32021 8.73996 8.92072 8.8063 8.51138L8.052 8.51183C7.70025 8.51183 7.40098 8.75509 7.32218 9.08874L7.30532 9.19139L7.24905 9.79988C7.25727 9.84435 7.26156 9.89019 7.26156 9.93704C7.26156 10.3513 6.92577 10.687 6.51156 10.687C6.13186 10.687 5.81807 10.4049 5.76841 10.0388L5.765 9.99898L5.762 9.99906L5.763 9.97298L5.76156 9.93704C5.76156 9.88033 5.76785 9.82509 5.77978 9.77198L5.85723 8.85496C5.94361 7.81838 6.81015 7.02106 7.85032 7.02106L9.1183 7.02161C9.78341 4.46444 11.1494 2.00098 13.587 2.00098ZM13.5809 3.51183C12.0707 3.51183 11.1648 5.1935 10.654 7.02154L16.5178 7.02139C16.0015 5.19413 15.0899 3.51183 13.5809 3.51183Z"
        fill={color}
      />
    </svg>
  );
}
