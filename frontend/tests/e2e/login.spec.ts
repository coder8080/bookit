import { expect, test } from "tests";
import { Route } from "tests/constants";

const { describe } = test;

describe("/login", () => {
  test("should successfully log in with valid credentials", async ({
    page,
    loginPage,
    accountPage,
    registeredUser,
  }) => {
    await accountPage.goto();
    await accountPage.logout();
    await loginPage.goto();
    await loginPage.proceed(registeredUser);
    await accountPage.goto();

    await expect(page.getByText(registeredUser.username).first()).toBeVisible();
  });

  test("should maintain session after page reload", async ({ page, accountPage, registeredUser }) => {
    await page.reload();
    await accountPage.goto();

    await expect(page.getByText(registeredUser.username).first()).toBeVisible();
  });

  test("should not log in when no credentials are provided", async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.submit();

    await expect(page).toHaveURL(Route.LOGIN);
  });

  test("should not log in with an incorrect username", async ({ page, loginPage, accountPage, registeredUser }) => {
    await accountPage.goto();
    await accountPage.logout();
    await loginPage.goto();
    await loginPage.fill({ username: "abc123abc", password: registeredUser.password });
    await loginPage.submit();

    await expect(page).toHaveURL(Route.LOGIN);
  });

  test("should not log in with an incorrect password", async ({ page, loginPage, accountPage, registeredUser }) => {
    await accountPage.goto();
    await accountPage.logout();
    await loginPage.goto();
    await loginPage.fill({ username: registeredUser.username, password: "abc123abc" });
    await loginPage.submit();

    await expect(page).toHaveURL(Route.LOGIN);
  });

  test("should not log in with invalid credentials", async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.fill({ username: "abc123abc", password: "abc123abc" });
    await loginPage.submit();

    await expect(page).toHaveURL(Route.LOGIN);
  });
});
