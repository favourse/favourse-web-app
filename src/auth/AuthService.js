// AuthService.js
import { AuthClient } from "@dfinity/auth-client";

const createAuthClient = async () => {
  const authClient = await AuthClient.create();
  return authClient;
};

export const login = async (onSuccess) => {
  const authClient = await createAuthClient();
  await authClient.login({
    identityProvider: process.env.REACT_APP_INTERNET_IDENTITY_PROVIDER_URL,
    onSuccess: () => {
      console.log("Login successful!");
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    },
  });
};

export const logout = async () => {
  const authClient = await createAuthClient();
  authClient.logout();
  console.log("Logged out!");
};

export const isAuthenticated = async () => {
  const authClient = await createAuthClient();
  return authClient.isAuthenticated();
};

export const getIdentity = async () => {
  const authClient = await createAuthClient();
  if (await authClient.isAuthenticated()) {
    return authClient.getIdentity();
  }
};

export const getPrincipalId = async () => {
  const identity = await getIdentity();
  if (identity) {
    return identity.getPrincipal().toString();
  }
  return null;
};
