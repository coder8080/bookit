import { expect, test } from "tests";
import { Route } from "tests/constants";

const { describe } = test;

describe("/register", () => {
  test("should successfully register a new user", async ({ page, accountPage, registeredUser }) => {
    await accountPage.goto();

    await expect(page.getByText(registeredUser.username).first()).toBeVisible();
  });

  test("should not register when no credentials are provided", async ({ page, registerPage }) => {
    await registerPage.goto();
    await registerPage.submit();

    await expect(page).toHaveURL(Route.REGISTER);
  });

  test("should not allow registration with an already registered username", async ({
    page,
    registerPage,
    accountPage,
    registeredUser,
  }) => {
    await accountPage.goto();
    await accountPage.logout();
    await registerPage.goto();
    await registerPage.fill(registeredUser);
    await registerPage.submit();

    await expect(page).toHaveURL(Route.REGISTER);
  });
});
