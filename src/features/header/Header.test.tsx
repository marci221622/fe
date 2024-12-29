import { render, fireEvent, act } from '@testing-library/react';
import { fork } from 'effector';

import { appVarriant } from '@/shared/configs';

import { modal } from '@/features/auth';

import { TestsWrapper } from '../../tests';

import { Header } from './Header';

describe('@/features/Header', () => {
  it('renders correctly', () => {
    const scope = fork();
    const { container } = render(<Header />, {
      wrapper: ({ children }) => <TestsWrapper scope={scope}>{children}</TestsWrapper>,
    });

    expect(container.querySelector('header')).toBeDefined();
    expect(container.querySelector('[data-test="profileBlock"]')).toBeDefined();
  });

  it('should return null when app is short', () => {
    const scope = fork({ values: new Map().set(appVarriant.$value, 'short') });
    const { container } = render(<Header />, {
      wrapper: ({ children }) => <TestsWrapper scope={scope}>{children}</TestsWrapper>,
    });

    expect(container.querySelector('header')).toBeNull();
  });

  it('should trigger login action', () => {
    const scope = fork();
    const { container } = render(<Header />, {
      wrapper: ({ children }) => <TestsWrapper scope={scope}>{children}</TestsWrapper>,
    });

    act(() => {
      fireEvent.click(container.querySelector('[data-test="loginAction"]')!);
    });

    expect(scope.getState(modal.$value)).toEqual('any');
  });

  it('should no return user bar', () => {
    const scope = fork();
    const { container } = render(<Header isLoginPage />, {
      wrapper: ({ children }) => <TestsWrapper scope={scope}>{children}</TestsWrapper>,
    });

    expect(container.querySelector('header')).toBeDefined();
    expect(container.querySelector('[data-test="profileBlock"]')).toBeNull();
  });

  it('should no return cart bar', () => {
    const scope = fork();
    const { container } = render(<Header isCartPage />, {
      wrapper: ({ children }) => <TestsWrapper scope={scope}>{children}</TestsWrapper>,
    });

    expect(container.querySelector('header')).toBeDefined();
    expect(container.querySelector('[data-test="profileBlock"]')).toBeDefined();
    expect(container.querySelector('[data-test="cartCounter"]')).toBeNull();
  });
});
