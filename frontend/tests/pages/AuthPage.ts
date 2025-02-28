import { Page } from "@playwright/test";

import { User } from "tests/entities/user";

export default abstract class AuthPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get usernameInput() {
    return this.page.locator('input[name="username"]');
  }

  get passwordInput() {
    return this.page.locator('input[name="password"]');
  }

  get submitButton() {
    return this.page.locator('button[type="submit"]');
  }

  async proceed(user: Partial<User>, url: string | RegExp | ((url: URL) => boolean) = "/") {
    await this.fill(user);
    await this.submit();
    await this.page.waitForURL(url, { waitUntil: "networkidle" });
  }

  async fill(user: Partial<User>) {
    if (user.username) await this.fillUsername(user.username);
    if (user.password) await this.fillPassword(user.password);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }
}
