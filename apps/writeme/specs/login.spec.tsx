import React from 'react';
import { render, screen, within } from '@testing-library/react';
import nextJest  from 'next/jest';
import '@testing-library/jest-dom';
import LogIn from '../app/auth/login/page';
import { expect, test, describe, it, vitest } from 'vitest';
import SignUp from '../app/auth/signup/page';
import { signIn, signOut, useSession } from 'next-auth/react';

import { userEvent } from '@storybook/testing-library';
import { expect, test, describe, it, vitest } from 'vitest';
vitest.mock('next-auth/react')

const mockUseSession = useSession as vitest.Mock;
;(signIn as vitest.Mock).mockImplementation(() => vitest.fn())
;(signOut as vitest.Mock).mockImplementation(() => vitest.fn())
const mockUsePathname = vitest.fn();

vitest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

vitest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => [[{ revalidate: '1' }]],
}));


vitest.mock<typeof import("next/navigation")>("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  const nextRouterMock = jest.requireActual("next-router-mock");
  const { useRouter } = nextRouterMock;
  const usePathname = vitest.fn().mockImplementation(() => {
    const router = useRouter();
    return router.asPath;
  });

  const useSearchParams = vitest.fn().mockImplementation(() => {
    const router = useRouter();
    return new URLSearchParams(router.query);
  });

  return {
    ...actual,
    useRouter: vitest.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  };
});


describe('SignUp', () => {



  mockUseSession.mockReturnValue({
    status: 'authenticated',
    data: null,
  })

  mockUsePathname.mockImplementation(() => '/');

    it('should render successfully', () => {
      const { baseElement } = render(<SignUp />);
      expect(baseElement).toBeTruthy();
    });

});
