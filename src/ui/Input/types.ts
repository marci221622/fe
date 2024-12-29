export type CommonInputProps = {
  Prefix?: React.JSX.Element | string | null;
  suffix?: React.JSX.Element | null;
  outline?: boolean;
  closable?: boolean;
  onCloseClick?: () => void;
  onStubClick?: () => void;
  bordered?: boolean;
  withShadow?: boolean;
  showStab?: boolean;
  stubClassName?: string;
  // инпут без каких либо примочек
  simple?: boolean;
  closeIcon?: 'default' | 'stroked';
  stretch?: boolean;
  isTelInput?: boolean;
  variant?: 'dark' | 'light';
};
