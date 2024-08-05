// @vitest-environment node

import { expect, test } from "vitest";
import { createMocks, createRequest } from 'node-mocks-http';

import { GET } from "../../../app/api/hello/route";

test("User endpoint works as expected", async () => {
  const {req, res} = createMocks({
    method: "GET"
  })

  const response = await GET({ ...req } as any);

  expect(response.status).toBe(200);
});
