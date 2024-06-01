import React from 'react';
import { render, screen, within } from '@testing-library/react';

import '@testing-library/jest-dom';
import SignUp from '../app/auth/signup/page';



import { userEvent } from '@storybook/testing-library';
import { expect, test, describe, it, vitest } from 'vitest';
import { signIn, signOut, useSession } from 'next-auth/react';
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
