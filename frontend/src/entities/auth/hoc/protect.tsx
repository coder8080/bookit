import { Navigate, type RouteSectionProps } from "@solidjs/router";
import { JSX, Match, Switch } from "solid-js";

import { getAccessTokenExpired } from "@/shared/session";

export const protect = (children: (props: RouteSectionProps) => JSX.Element, fallback: string = "/login") => {
  return (props: RouteSectionProps) => {
    const redirect = encodeURIComponent(props.location.pathname);

    return (
      <Switch>
        <Match when={getAccessTokenExpired() === false}>{children(props)}</Match>
        <Match when={getAccessTokenExpired() === true}>
          <Navigate href={`${fallback}?redirect=${redirect}`} />
        </Match>
      </Switch>
    );
  };
};
