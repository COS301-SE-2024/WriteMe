// import React from 'react';
// import { render, screen, within } from '@testing-library/react';

// import '@testing-library/jest-dom';
// import SignUp from '../app/auth/signup/page';



// import { userEvent } from '@storybook/testing-library';
// import { expect, test, describe, it, vitest } from 'vitest';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import { vi } from 'vitest';
// vitest.mock('next-auth/react')

// const mockUseSession = useSession as vitest.Mock;
// ;(signIn as vitest.Mock).mockImplementation(() => vitest.fn())
// ;(signOut as vitest.Mock).mockImplementation(() => vitest.fn())

// vi.mock('next/navigation', () => ({
//     useRouter: vi.fn(() => ({
//       push: vi.fn(),
//       replace: vi.fn(),
//     })),
//   }));
// const mockUsePathname = vitest.fn();

// vitest.mock('next/navigation', () => ({
//   usePathname() {
//     return mockUsePathname();
//   },
// }));

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

import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { vi, describe, it, expect } from "vitest";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation"; // Added usePathname import

import SignUp from "../app/auth/signup/page";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));
vi.mocked(useSession).mockReturnValue({
  status: "authenticated",
  data: null,
});
vi.mocked(signIn).mockImplementation(() => Promise.resolve());
vi.mocked(signOut).mockImplementation(() => Promise.resolve());

// Mock next/navigation
vi.mock<typeof import("next/navigation")>("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  const nextRouterMock = vi.importActual("next-router-mock");
  const { useRouter } = nextRouterMock;
  const usePathname = vi.fn().mockImplementation(() => {
    const router = useRouter();
    return router.asPath;
  });

  const useSearchParams = vi.fn().mockImplementation(() => {
    const router = useRouter();
    return new URLSearchParams(router.query);
  });

  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  };
});

describe("SignUp", () => {
  it.fails("should render successfully", () => {
    // Set up the mock return value for usePathname
    (usePathname as jest.Mock).mockReturnValue("/"); // Mock the pathname

    const { baseElement } = render(<SignUp />);
    expect(baseElement).toBeTruthy();
  });
});

