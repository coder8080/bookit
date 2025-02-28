import { createAsync } from "@solidjs/router";
import { Show, Suspense } from "solid-js";

import { getCurrentUser } from "@/entities/user";
import { LogoutForm } from "@/features/auth";
import { UpdateCurrentUserPasswordCell, UpdateCurrentUserUsernameCell } from "@/features/user";
import Avatar from "@/shared/ui/avatar";
import Cell from "@/shared/ui/cell";
import Group from "@/shared/ui/group";
import { Navigation } from "@/widgets/nav";

import { AccountPageSkeleton } from "./AccountPageSkeleton";

import IconIcRoundTag from "~icons/ic/round-tag";

const AccountPage = () => {
  const currentUser = createAsync(() => getCurrentUser());

  return (
    <div class="flex grow flex-col space-y-4">
      <Navigation label="Аккаунт" />

      <Suspense fallback={<AccountPageSkeleton />}>
        <Show when={currentUser()}>
          {(currentUser) => (
            <>
              <Avatar alt={currentUser().username} class="size-24 self-center text-4xl" />

              <h2 class="mb-8 self-center text-3xl font-semibold">{currentUser().username}</h2>

              <Group>
                <Group.Content>
                  <UpdateCurrentUserUsernameCell username={currentUser().username} />
                  <UpdateCurrentUserPasswordCell />
                </Group.Content>
              </Group>

              <Group>
                <Group.Content>
                  <Cell>
                    <IconIcRoundTag class="size-6 shrink-0" role="presentation" />
                    <Cell.Group>
                      <Cell.Label>ID</Cell.Label>
                    </Cell.Group>
                    <Cell.Value class="font-mono">{currentUser().id}</Cell.Value>
                  </Cell>
                </Group.Content>
              </Group>

              <LogoutForm class="max-lg:mt-auto" />
            </>
          )}
        </Show>
      </Suspense>
    </div>
  );
};

export default AccountPage;
