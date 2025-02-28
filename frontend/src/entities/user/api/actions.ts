import { action, json } from "@solidjs/router";

import { client } from "@/shared/api";

export const updateCurrentUserUsernameAction = action(async (username: string) => {
  const { error } = await client.PATCH("/users/me/username", {
    body: {
      username: username,
    },
  });

  return json({ error });
}, "update-current-user-username-action");

export const updateCurrentUserPasswordAction = action(async (password: string) => {
  const { error } = await client.PATCH("/users/me/password", {
    body: {
      password: password,
    },
  });

  return json({ error });
}, "update-current-user-password-action");
