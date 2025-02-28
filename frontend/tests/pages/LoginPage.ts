import { Route } from "tests/constants";

import AuthPage from "./AuthPage";

export default class LoginPage extends AuthPage {
  async goto() {
    await this.page.goto(Route.LOGIN, { waitUntil: "networkidle" });
  }
}
