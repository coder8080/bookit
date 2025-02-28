import { expect, test } from "tests";
import { Route } from "tests/constants";

const { describe } = test;

describe("/account", () => {
  test("should update the username and allow login with the new username", async ({
    page,
    loginPage,
    accountPage,
    registeredUser,
  }) => {
    await accountPage.goto();

    const newUsername = await accountPage.updateUsername();

    await expect(page.getByText(newUsername).first()).toBeVisible();

    await accountPage.logout();
    await loginPage.goto();
    await loginPage.proceed({ username: newUsername, password: registeredUser.password });
    await accountPage.goto();

    await expect(page.getByText(newUsername).first()).toBeVisible();
  });

  test("should update the password and allow login with the new password", async ({
    page,
    loginPage,
    accountPage,
    registeredUser,
  }) => {
    await accountPage.goto();

    const newPassword = await accountPage.updatePassword();

    await accountPage.logout();
    await loginPage.goto();
    await loginPage.proceed({ username: registeredUser.username, password: newPassword });
    await accountPage.goto();

    await expect(page.getByText(registeredUser.username).first()).toBeVisible();
  });

  test("should log out the user and redirect to the login page with the correct redirect URL", async ({
    page,
    accountPage,
    registeredUser,
  }) => {
    await accountPage.goto();

    await expect(page.getByText(registeredUser.username).first()).toBeVisible();

    await accountPage.logout();
    await accountPage.goto();

    await expect(page).toHaveURL(`${Route.LOGIN}?redirect=${encodeURIComponent(Route.ACCOUNT)}`);
  });
});
