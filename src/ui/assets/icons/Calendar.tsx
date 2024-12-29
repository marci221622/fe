export function Calendar({ color = 'currentColor', ...props }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.25 3C16.6642 3 17 3.33579 17 3.75V4.75H17.1542C18.4915 4.75 18.9764 4.88924 19.4653 5.1507C19.9542 5.41216 20.3378 5.79584 20.5993 6.28473C20.8608 6.77362 21 7.25855 21 8.59583V17.169C21 18.5063 20.8608 18.9912 20.5993 19.4801C20.3378 19.969 19.9542 20.3527 19.4653 20.6141C18.9764 20.8756 18.4915 21.0148 17.1542 21.0148H6.84583C5.50855 21.0148 5.02362 20.8756 4.53473 20.6141C4.04584 20.3527 3.66216 19.969 3.4007 19.4801C3.13924 18.9912 3 18.5063 3 17.169V8.59583C3 7.25855 3.13924 6.77362 3.4007 6.28473C3.66216 5.79584 4.04584 5.41216 4.53473 5.1507C5.02362 4.88924 5.50855 4.75 6.84583 4.75H7V3.75C7 3.33579 7.33579 3 7.75 3C8.16421 3 8.5 3.33579 8.5 3.75V4.75H15.5V3.75C15.5 3.33579 15.8358 3 16.25 3ZM19.5 11H4.5V17.5919C4.5 18.2605 4.56962 18.503 4.70035 18.7475C4.83108 18.9919 5.02292 19.1837 5.26737 19.3145C5.48959 19.4333 5.71017 19.5017 6.2508 19.5131L6.42291 19.5148H17.5771C18.2457 19.5148 18.4882 19.4452 18.7326 19.3145C18.9771 19.1837 19.1689 18.9919 19.2997 18.7475C19.4185 18.5252 19.4868 18.3046 19.4983 17.764L19.5 17.5919V11ZM7 6.25H6.42291C5.75427 6.25 5.51181 6.31962 5.26737 6.45035C5.02292 6.58108 4.83108 6.77292 4.70035 7.01737C4.5815 7.23959 4.51316 7.46017 4.50172 8.0008L4.5 8.17291V9.5H19.5V8.17291C19.5 7.50427 19.4304 7.26181 19.2997 7.01737C19.1689 6.77292 18.9771 6.58108 18.7326 6.45035C18.4882 6.31962 18.2457 6.25 17.5771 6.25H17V7.25C17 7.66421 16.6642 8 16.25 8C15.8358 8 15.5 7.66421 15.5 7.25V6.25H8.5V7.25C8.5 7.66421 8.16421 8 7.75 8C7.33579 8 7 7.66421 7 7.25V6.25Z"
        fill={color}
      />
    </svg>
  );
}