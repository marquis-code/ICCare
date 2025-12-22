
import { ref, watch, computed } from "vue";
import { useStorage } from "@vueuse/core";

const runtimeData = {
  auth: ref(),
  user: ref({} as any),
  token: ref(""),
  refreshToken: ref(""),
};

const localStorageData = {
  auth: ref(),
  user: useStorage("user", {} as any),
  token: useStorage("token", ""),
  refreshToken: useStorage("refreshToken", ""),
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
})();

export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL as string;

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

  const logOut = () => {
    localStorage.clear();
    runtimeData.user.value = {};
    runtimeData.token.value = "";
    runtimeData.refreshToken.value = "";
    runtimeData.auth.value = null;
    // location.href = '/login'
  };

  const setToken = (token: string) => {
    runtimeData.token.value = token;
    localStorageData.token.value = token;
  };

  const setRefreshToken = (refreshToken: string) => {
    runtimeData.refreshToken.value = refreshToken;
    localStorageData.refreshToken.value = refreshToken;
  };

  const createUser = (data: any) => {
    // Extract tokens and user data from the backend response
    const { access_token, refresh_token, user } = data;

    // Set tokens
    localStorageData.token.value = access_token;
    localStorageData.refreshToken.value = refresh_token;
    runtimeData.token.value = access_token;
    runtimeData.refreshToken.value = refresh_token;

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

  return {
    id,
    isLoggedIn,
    isEmailVerified,
    createUser,
    ...runtimeData,
    logOut,
    updateUser,
    setToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
  };
};