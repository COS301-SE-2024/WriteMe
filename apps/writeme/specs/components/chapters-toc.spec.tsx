import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession, signIn, signOut } from 'next-auth/react'
import { userEvent } from '@storybook/testing-library';
import { expect, test, describe, it, vitest, vi } from 'vitest';
import ChaptersTableofContents from '../../components/chapters-toc';
import { mockRouter } from '../utils/next-router-utils';
import { boolean, json, text, timestamp, varchar } from 'drizzle-orm/pg-core/index';
import { users } from '../../db/schema';
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



describe('Chapters Table of Contents', () => {

  it('should render successfully', () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    mockUsePathname.mockImplementation(() => '/');


    const story = {
      id: "1",
      userId: "1",
      title: "Testing",
      content: "<h1>Testing</h1>",
      description: "desc",
      brief: "brief",
      cover: "",
      blocks: [],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
      chapters: [],
      comments: [],
    }


    const { baseElement } = render(<ChaptersTableofContents story={story}></ChaptersTableofContents>);
    expect(baseElement).toBeTruthy();
  });


  it('should render successfully with chapter', () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    mockUsePathname.mockImplementation(() => '/');


    const story = {
      id: "1",
      userId: "1",
      title: "Testing",
      content: "<h1>Testing</h1>",
      description: "desc",
      brief: "brief",
      cover: "",
      blocks: [],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
      chapters: [ {
        id: "1",
        storyId: "1",
        title: "Test",
        description: "desc",
        brief: "brief",
        likes: [],
        comments: []
      } ],
      comments: []
    }


    const { baseElement } = render(<ChaptersTableofContents story={story}></ChaptersTableofContents>);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with chapters, likes and comments', () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    mockUsePathname.mockImplementation(() => '/');


    const story = {
      id: "1",
      userId: "1",
      title: "Testing",
      content: "<h1>Testing</h1>",
      description: "desc",
      brief: "brief",
      cover: "",
      blocks: [],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [
        {
          userId: "1",
          storyId: "2",
          chapterId: "3"
        }
      ],
      chapters: [ {
        id: "1",
        storyId: "1",
        title: "Test",
        description: "desc",
        brief: "brief",
        likes: [],
        comments: []
      } ],
      comments: [{
        userId: "1",
        content: "test",
        storyId: "1",
      }]
    }


    const { baseElement } = render(<ChaptersTableofContents story={story}></ChaptersTableofContents>);
    expect(baseElement).toBeTruthy();
  });

});
