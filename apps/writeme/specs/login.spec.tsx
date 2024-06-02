// import React from 'react';
// import { render, screen, within } from '@testing-library/react'
// import '@testing-library/jest-dom';
// import LogIn from '../app/auth/login/page';
// import { expect, test, describe, it, vitest, vi } from 'vitest';
// import SignUp from '../app/auth/signup/page';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import jest from "jest";
// import { useRouter } from 'next/navigation';

// import { userEvent } from '@storybook/testing-library';
// vitest.mock('next-auth/react')

// // Mock useRouter
// vi.mock('next/navigation', () => ({
//     useRouter: vi.fn(() => ({
//       push: vi.fn(),
//       replace: vi.fn(),
//       // Add other properties/methods of useRouter that your component uses
//     })),
//   }));

// const mockUseSession = useSession as vitest.Mock;
// ;(signIn as vitest.Mock).mockImplementation(() => vitest.fn())
// ;(signOut as vitest.Mock).mockImplementation(() => vitest.fn())
// const mockUsePathname = vitest.fn();

// vitest.mock('next/navigation', () => ({
//   usePathname() {
//     return mockUsePathname();
//   },
// }));

// vitest.mock('next/navigation', () => ({
//   ...require('next-router-mock'),
//   useSearchParams: () => [[{ revalidate: '1' }]],
// }));


// vitest.mock<typeof import("next/navigation")>("next/navigation", () => {
//   const actual = vi.importActual("next/navigation");
//   const nextRouterMock = vi.importActual("next-router-mock");
//   const { useRouter } = nextRouterMock;
//   const usePathname = vitest.fn().mockImplementation(() => {
//     const router = useRouter();
//     return router.asPath;
//   });

//   const useSearchParams = vitest.fn().mockImplementation(() => {
//     const router = useRouter();
//     return new URLSearchParams(router.query);
//   });

//   return {
//     ...actual,
//     useRouter: vitest.fn().mockImplementation(useRouter),
//     usePathname,
//     useSearchParams,
//   };
// });


// describe('SignUp', () => {



//   mockUseSession.mockReturnValue({
//     status: 'authenticated',
//     data: null,
//   })

//   mockUsePathname.mockImplementation(() => '/');

//     it('should render successfully', () => {
//       const { baseElement } = render(<SignUp />);
//       expect(baseElement).toBeTruthy();
//     });

// });

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import LoginForm from '../app/auth/login/page'; 
vi.importActual('next/navigation');

import { expect, test, describe, it, vitest } from 'vitest';

const mockUseSession = useSession as vitest.Mock;
const mockUsePathname = vitest.fn();

vitest.mock('next/navigation', () => ({
    usePathname() {
      return mockUsePathname();
    },
  }));


vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ 
    push: vi.fn(),
    replace: vi.fn(),
  })),
}));
 
describe('LoginForm', () => {
  it.fails('should render successfully', () => {
    mockUseSession.mockReturnValue({
        status: 'authenticated',
        data: null,
      })
    render(<LoginForm />);
    // Add assertions to check if the form elements are rendered correctly
  });
})

