import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

import {vi} from "vitest"

vi.mock("next/router", () => vi.importActual("next-router-mock"));

mockRouter.useParser(
  createDynamicRouteParser([
    // @see https://github.com/scottrippey/next-router-mock#dynamic-routes
  ])
);

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

export { mockRouter };
