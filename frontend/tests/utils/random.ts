const USERNAME_CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
const PASSWORD_CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export const generateRandomUsername = (): string => {
  const length = Math.floor(Math.random() * (32 - 3 + 1)) + 3;

  let username = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * USERNAME_CHARACTERS.length);
    username += USERNAME_CHARACTERS[randomIndex];
  }

  return username;
};

export const generateRandomPassword = (): string => {
  const length = Math.floor(Math.random() * (128 - 8 + 1)) + 8;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * PASSWORD_CHARACTERS.length);
    password += PASSWORD_CHARACTERS[randomIndex];
  }

  return password;
};
