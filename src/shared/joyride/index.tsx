import cn from 'classnames';
import Joyride, { CallBackProps, Styles, Step, TooltipRenderProps } from 'react-joyride';

import { ECloseIconPositions } from '@/features/brands';

import { useNoScroll } from '@/lib/hooks';

import { Typography } from '@/ui/index';

import { CloseIcon } from '@/ui/assets/icons';

import styles from './styles.module.scss';

const getTooltipClassName = (iconPosition: ECloseIconPositions) => {
  switch (iconPosition) {
    case ECloseIconPositions.RIGHT:
      return styles.containerWithRightIcon;
    default:
      return '';
  }
};

type CustomTooltipProps = {
  iconPosition?: ECloseIconPositions;
} & TooltipRenderProps;

export function CustomTooltip({
  step,
  closeProps,
  iconPosition = ECloseIconPositions.RIGHT,
  ...props
}: CustomTooltipProps) {
  const { tooltipProps } = props;
  const className = getTooltipClassName(iconPosition);

  return (
    <div className={cn(className, styles.joyrideContainer)} {...tooltipProps}>
      {step.title && iconPosition === ECloseIconPositions.TOP ? (
        <div className={styles.tooltipHeader}>
          {iconPosition === ECloseIconPositions.TOP ? (
            <CloseIcon className={styles.closeIconTop} onClick={closeProps.onClick} />
          ) : null}
          <Typography.Title>{step?.title}</Typography.Title>
        </div>
      ) : null}
      <Typography.Paragraph center className={styles.joyrideText}>
        {step.content}
      </Typography.Paragraph>
      {iconPosition === ECloseIconPositions.RIGHT ? (
        <CloseIcon className={styles.closeIcon} onClick={closeProps.onClick} />
      ) : null}
    </div>
  );
}

type PropsType = {
  run: boolean;
  steps: Step[];
  styles?: Partial<Styles>;
  iconPosition?: ECloseIconPositions;
  callback?: (data: CallBackProps) => void;
};

const JoyrideComponent = ({ callback, run, steps, styles, iconPosition }: PropsType) => {
  useNoScroll(run);

  return (
    <Joyride
      steps={steps}
      disableScrolling
      run={run}
      styles={styles}
      callback={callback}
      tooltipComponent={props => <CustomTooltip iconPosition={iconPosition} {...props} />}
    />
  );
};

export default JoyrideComponent;
