import { User } from "tests/entities/user";
import { generateRandomPassword, generateRandomUsername } from "tests/utils/random";

export default class UserFactory {
  public static create(overrides: Partial<User> = {}): User {
    const user: User = {
      username: generateRandomUsername(),
      password: generateRandomPassword(),
    };

    return { ...user, ...overrides };
  }
}
