import { test as base } from "@playwright/test";

import { User } from "./entities/user";
import UserFactory from "./factories/UserFactory";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

type TestArgs = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  accountPage: AccountPage;
  registeredUser: User;
};

const test = base.extend<TestArgs>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  registeredUser: async ({ registerPage }, use) => {
    const user = UserFactory.create();

    await registerPage.goto();
    await registerPage.proceed(user);

    await use(user);
  },
});

export { test };
export { expect } from "@playwright/test";
