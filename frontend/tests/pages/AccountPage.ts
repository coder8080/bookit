import { Page } from "@playwright/test";

import { Route } from "tests/constants";
import { generateRandomPassword, generateRandomUsername } from "tests/utils/random";

export default class AccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get logoutButton() {
    return this.page.getByTestId("logout");
  }

  get updateUsernameTrigger() {
    return this.page.getByTestId("update-username");
  }

  get updatePasswordTrigger() {
    return this.page.getByTestId("update-password");
  }

  async goto() {
    await this.page.goto(Route.ACCOUNT, { waitUntil: "networkidle" });
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.getByTestId("confirm").click();
    await this.page.waitForURL(Route.HOME, { waitUntil: "networkidle" });
  }

  async updateUsername() {
    await this.updateUsernameTrigger.click();

    const newUsername = generateRandomUsername();

    await this.page.fill('input[name="username"]', newUsername);
    await this.page.getByTestId("save").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByTestId("close").click();

    return newUsername;
  }

  async updatePassword() {
    await this.updatePasswordTrigger.click();

    const newPassword = generateRandomPassword();

    await this.page.fill('input[name="password1"]', newPassword);
    await this.page.fill('input[name="password2"]', newPassword);
    await this.page.getByTestId("save").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByTestId("close").click();

    return newPassword;
  }
}
