// AuthService.js
import { AuthClient } from "@dfinity/auth-client";

const AuthService = {
  authClient: null,

  init: async () => {
    AuthService.authClient = await AuthClient.create();
  },

  login: async () => {
    if (!AuthService.authClient) {
      console.error("Authentication client has not been initialized.");
      return;
    }

    return new Promise((resolve, reject) => {
      AuthService.authClient.login({
        identityProvider:
          process.env.REACT_APP_DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : process.env
                .REACT_APP_LOCAL_NETWORK`?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
        onSuccess: async () => {
          const identity = AuthService.authClient.getIdentity();
          const principalId = identity.getPrincipal().toString();
          resolve(principalId); // Resolve with the principal ID
        },
        onError: (err) => reject(err),
      });
    });
  },

  getPrincipalId: () => {
    if (!AuthService.authClient) {
      console.error("Authentication client has not been initialized.");
      return null;
    }

    try {
      const identity = AuthService.authClient.getIdentity();
      if (!identity) {
        console.error("Not authenticated.");
        return null;
      }
      return identity.getPrincipal().toString();
    } catch (error) {
      console.error("Error retrieving principal ID:", error);
      return null;
    }
  },

  logout: async () => {
    if (!AuthService.authClient) {
      console.error("Authentication client has not been initialized.");
      return;
    }

    await AuthService.authClient.logout();
  },
};

export default AuthService;
