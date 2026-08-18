export const authKeys = {
  all: ["auth"] as const,
  emailCheck: () => [...authKeys.all, "email-check"] as const,
  login: () => [...authKeys.all, "login"] as const,
};
