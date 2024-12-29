import { ReactNode } from 'react';

export type FaqDataTypes = {
  buy: {
    title: string;
    content: {
      question: string;
      answer: ReactNode;
    }[];
  };
  sell: {
    title: string;
    content: {
      question: string;
      answer: ReactNode;
    }[];
  };
  profsell: {
    title: string;
    content: {
      question: string;
      answer: ReactNode;
    }[];
  };
};
