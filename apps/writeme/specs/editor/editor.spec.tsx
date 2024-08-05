import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditorContext } from '../../app/myworks/[story]/write/[chapter]/editor-context';
import EditorController from '../../app/myworks/[story]/write/[chapter]/editor-controller';
import EditorLoader from '../../app/myworks/[story]/write/[chapter]/editor-loader';
import LocalNavbar from '../../app/myworks/[story]/write/[chapter]/local-navbar'
import { useSession, signIn, signOut } from 'next-auth/react'
import { userEvent } from '@storybook/testing-library';
import { expect, test, describe, it, vitest, vi } from 'vitest';
import { mockRouter } from '../utils/next-router-utils';
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


describe('Editor', () => {

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
  it.fails('should render successfully', () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    mockUsePathname.mockImplementation(() => '/');

    const { baseElement } = render(<EditorContext >
      <EditorLoader inputChapter={"1"}>
        <EditorController>
          <LocalNavbar>
          </LocalNavbar>
        </EditorController>
      </EditorLoader>
    </EditorContext>);
    expect(baseElement).toBeTruthy();
  });

});
