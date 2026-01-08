
import { ref, watch, computed } from "vue";
import { useStorage } from "@vueuse/core";

const runtimeData = {
  auth: ref(),
  user: ref({} as any),
  token: ref(""),
  refreshToken: ref(""),
  tokenExpiry: ref<number | null>(null), // Add token expiry timestamp
};

const localStorageData = {
  auth: ref(),
  user: useStorage("user", {} as any),
  token: useStorage("token", ""),
  refreshToken: useStorage("refreshToken", ""),
  tokenExpiry: useStorage<number | null>("tokenExpiry", null), // Store expiry in localStorage
};

const error = ref<string | null>(null);

// Guard against null or undefined runtimeData.user.value
watch(
  runtimeData.user,
  (val) => {
    if (val && typeof val === "object") {
      Object.keys(val).forEach((key) => {
        localStorageData.user.value[key] = val[key];
      });
    }
  },
  { deep: true }
);

// Initialize runtime data from localStorage
(() => {
  runtimeData.auth.value = localStorageData.auth.value;
  runtimeData.user.value = localStorageData.user.value;
  runtimeData.token.value = localStorageData.token.value;
  runtimeData.refreshToken.value = localStorageData.refreshToken.value;
  runtimeData.tokenExpiry.value = localStorageData.tokenExpiry.value;
})();

export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL as string;

// Helper function to decode JWT and extract expiry
const decodeTokenExpiry = (token: string): number | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
};

export const useUser = () => {
  const id = computed({
    get: () => runtimeData?.user?.value?.user_id ?? "",
    set: () => {},
  });

  const isLoggedIn = computed({
    get: () => {
      if (!runtimeData.token?.value) return false;
      return (
        runtimeData?.user?.value != null &&
        typeof runtimeData.user.value === "object" &&
        Object.keys(runtimeData.user.value).length > 0
      );
    },
    set: () => {},
  });

  const isEmailVerified = computed(() => {
    return runtimeData?.user?.value?.isEmailVerified;
  });

  // Check if token is expired or about to expire (within 5 minutes)
  const isTokenExpired = computed(() => {
    if (!runtimeData.tokenExpiry.value) return false;
    const now = Date.now();
    const bufferTime = 5 * 60 * 1000; // 5 minutes buffer
    return now >= (runtimeData.tokenExpiry.value - bufferTime);
  });

  const logOut = () => {
    localStorage.clear();
    runtimeData.user.value = {};
    runtimeData.token.value = "";
    runtimeData.refreshToken.value = "";
    runtimeData.auth.value = null;
    runtimeData.tokenExpiry.value = null;
  };

  const setToken = (token: string) => {
    runtimeData.token.value = token;
    localStorageData.token.value = token;
    
    // Decode and store token expiry
    const expiry = decodeTokenExpiry(token);
    if (expiry) {
      runtimeData.tokenExpiry.value = expiry;
      localStorageData.tokenExpiry.value = expiry;
    }
  };

  const setRefreshToken = (refreshToken: string) => {
    runtimeData.refreshToken.value = refreshToken;
    localStorageData.refreshToken.value = refreshToken;
  };

  const createUser = (data: any) => {
    // Extract tokens and user data from the backend response
    const { access_token, refresh_token, user } = data;

    // Set tokens with expiry
    setToken(access_token);
    setRefreshToken(refresh_token);

    // Set user data
    localStorageData.user.value = user;
    runtimeData.user.value = user;
  };

  const updateUser = (newUser: any) => {
    // Retrieve the existing user data from runtime or local storage
    const existingUser = runtimeData.user.value || {};

    // Merge the existing user data with the new user data
    const updatedUser = { ...existingUser, ...newUser };

    // Update the runtimeData and localStorage with the new user data
    runtimeData.user.value = updatedUser;
    localStorageData.user.value = updatedUser;
  };

  const getAccessToken = () => runtimeData.token.value;
  
  const getRefreshToken = () => runtimeData.refreshToken.value;

  const getTokenExpiry = () => runtimeData.tokenExpiry.value;

  return {
    id,
    isLoggedIn,
    isEmailVerified,
    isTokenExpired,
    createUser,
    ...runtimeData,
    logOut,
    updateUser,
    setToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    getTokenExpiry,
  };
};