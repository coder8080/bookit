import { query } from "@solidjs/router";

import { client } from "@/shared/api";
import { getAccessTokenExpired, setAccessToken } from "@/shared/session";

export const getCurrentUser = query(async () => {
  if (getAccessTokenExpired()) {
    return;
  }

  const { data, response } = await client.GET("/users/me");

  if (response.status !== 200) {
    setAccessToken(undefined);
    return undefined;
  }

  return data;
}, "current-user");

export const getUser = query(async (username: string) => {
  const { data } = await client.GET("/users/{username}", {
    params: {
      path: {
        username: username,
      },
    },
  });

  return { data };
}, "user");

export const getUsers = query(async () => {
  const { data } = await client.GET("/users");

  return { data };
}, "users");
