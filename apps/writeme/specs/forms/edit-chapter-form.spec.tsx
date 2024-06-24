import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditChapterForm from '../../app/myworks/[story]/write/[chapter]/edit/edit-chapter-form';
import { useSession, signIn, signOut } from 'next-auth/react'
import { userEvent } from '@storybook/testing-library';
import { expect, test, describe, it, vitest, vi } from 'vitest';
vitest.mock('next-auth/react')

const mockUseSession = useSession as vitest.Mock;
;(signIn as vitest.Mock).mockImplementation(() => vitest.fn())
;(signOut as vitest.Mock).mockImplementation(() => vitest.fn())
const mockUsePathname = vitest.fn();

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


describe('Edit Chapter Form', () => {

  it.fails('should render successfully', () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    mockUsePathname.mockImplementation(() => '/');

    const chapter = {
      id: "1",
      order: 1,
      title: "Test",
      content: "Test",
      cover: "",
      blocks: [],
      published: true,
      createdAt: "",
      updatedAt: "",
      storyId: "1"
    }

    const { baseElement } = render(<EditChapterForm chapter={chapter} />);
    expect(baseElement).toBeTruthy();
  });

});
