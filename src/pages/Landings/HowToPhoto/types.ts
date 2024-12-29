export type OverallPlan = {
  title: string;
  content: {
    text: string;
    photos: {
      main: string;
      main2x: string;
      mainwebp: string;
      mainwebp2x: string;
    }[];
  }[];
};
