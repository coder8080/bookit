import { createAsync } from "@solidjs/router";
import { Component, Show, Suspense } from "solid-js";

import { getCurrentUser } from "@/entities/user";
import Avatar from "@/shared/ui/avatar";
import Skeleton from "@/shared/ui/skeleton";

import Logo from "./Logo";
import NavLink from "./NavLink";

import IconIcRoundMap from "~icons/ic/round-map";
import IconIcRoundPlus from "~icons/ic/round-plus";
import IconIcRoundQRCode from "~icons/ic/round-qr-code";
import IconIcRoundRoom from "~icons/ic/round-room";
import IconIcRoundSettings from "~icons/ic/round-settings";

const Nav: Component = () => {
  const currentUser = createAsync(() => getCurrentUser());

  return (
    <nav class="flex size-full flex-col items-start gap-6">
      <Logo as="header" class="px-3" />

      <div class="scrollbar-thin w-full grow space-y-1 overflow-x-clip overflow-y-auto">
        <NavLink href="/" before={<IconIcRoundMap class="size-6" />}>
          Карта
        </NavLink>
        <NavLink href="/reservations" before={<IconIcRoundRoom class="size-6" />}>
          Мои брони
        </NavLink>
        <NavLink href="/qr" before={<IconIcRoundQRCode class="size-6" />}>
          QR-код
        </NavLink>
        <NavLink href="/settings" before={<IconIcRoundSettings class="size-6" />}>
          Настройки
        </NavLink>
      </div>

      <div class="w-full space-y-1">
        <Suspense fallback={<Skeleton class="h-10 rounded-lg" opacity={25} />}>
          <Show
            when={currentUser()}
            fallback={
              <NavLink href="/login" before={<IconIcRoundPlus class="size-6" />}>
                Войти в аккаунт
              </NavLink>
            }
          >
            {(currentUser) => (
              <NavLink href="/account" before={<Avatar alt={currentUser().username} class="size-6 text-xs" />}>
                {currentUser().username}
              </NavLink>
            )}
          </Show>
        </Suspense>
      </div>

      <footer class="flex w-full flex-col gap-1 text-sm text-fg-tertiary">
        <span class="font-medium">{import.meta.env.APP_NAME}</span>
        <span>Версия {import.meta.env.APP_VERSION}</span>
      </footer>
    </nav>
  );
};

export default Nav;
