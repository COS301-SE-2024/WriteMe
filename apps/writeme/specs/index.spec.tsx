import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../app/page';
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/dist/jest';
import { useSession, signIn, signOut } from 'next-auth/react'
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


describe('Page', () => {

  // const mockSession = {
  //   expires: new Date(Date.now() + 2 * 86400).toISOString(),
  //   user: {
  //     email  : "khyal@khyalkara.com",
  //     id: "49dbc6a4-ab3e-41d0-b2be-d600badb4129",
  //     image: "https://avatars.githubusercontent.com/u/72245642?v=4",
  //     name: "Khyal Kara"
  //   },
  //   status: "authenticated",
  // };
  it('should render successfully', () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    mockUsePathname.mockImplementation(() => '/');

    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });

});

describe('Able to sign up', () => {
  const user = userEvent.setup();
  mockUseSession.mockReturnValue({
    status: 'authenticated',
    data: null,
  })

  mockUsePathname.mockImplementation(() => '/');
  it('should show join now on landing page', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })
    const { baseElement } = render(<Page />);
    expect(screen.getByTestId('join_now_link')).toHaveTextContent('Join Now');
  });

  it('should show sign up in nav bar', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })
    const { baseElement} = render(<Page />);
    expect(screen.getByTestId('sign_up_button')).toHaveTextContent('Login');
  });

});
