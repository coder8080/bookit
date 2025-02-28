import { Route } from "tests/constants";

import AuthPage from "./AuthPage";

export default class RegisterPage extends AuthPage {
  async goto() {
    await this.page.goto(Route.REGISTER, { waitUntil: "networkidle" });
  }
}
