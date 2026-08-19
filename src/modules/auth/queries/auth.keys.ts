export const authKeys = {
  all: ["auth"] as const,
  emailCheck: () => [...authKeys.all, "email-check"] as const,
  login: () => [...authKeys.all, "login"] as const,
  refresh: () => [...authKeys.all, "refresh"] as const,
  logout: () => [...authKeys.all, "logout"] as const,
  currentProfile: () => [...authKeys.all, "current-profile"] as const,
  session: () => [...authKeys.all, "session"] as const,
};
