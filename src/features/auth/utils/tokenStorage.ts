import type { RoleEnum } from "../authTypes";

const STORAGE_KEY = "sv_auth_data";
const SECRET = "SmartVillage2024";

const encrypt = (text: string): string => {
  const encoded = btoa(text);
  let result = "";
  for (let i = 0; i < encoded.length; i++) {
    result += String.fromCharCode(
      encoded.charCodeAt(i) ^ SECRET.charCodeAt(i % SECRET.length)
    );
  }
  return btoa(result);
};

const decrypt = (encrypted: string): string => {
  try {
    const decoded = atob(encrypted);
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(
        decoded.charCodeAt(i) ^ SECRET.charCodeAt(i % SECRET.length)
      );
    }
    return atob(result);
  } catch {
    return "";
  }
};

interface AuthData {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userRole: RoleEnum;
}

const getStoredData = (): AuthData | null => {
  const encrypted = sessionStorage.getItem(STORAGE_KEY);
  if (!encrypted) return null;

  try {
    const decrypted = decrypt(encrypted);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
};

const setStoredData = (data: AuthData): void => {
  console.log("********data  to be stored after encription:********", data);
  const encrypted = encrypt(JSON.stringify(data));
  sessionStorage.setItem(STORAGE_KEY, encrypted);
};

export const tokenStorage = {
  setAuth: (
    access: string,
    refresh: string,
    userId: string,
    role: RoleEnum
  ) => {
    setStoredData({
      accessToken: access,
      refreshToken: refresh,
      userId,
      userRole: role,
    });
  },

  getAccessToken: (): string | null => getStoredData()?.accessToken || null,
  getRefreshToken: (): string | null => getStoredData()?.refreshToken || null,
  getUserId: (): string | null => getStoredData()?.userId || null,
  getUserRole: (): RoleEnum | null => getStoredData()?.userRole || null,

  clearAuth: () => {
    sessionStorage.removeItem(STORAGE_KEY);
  },
};
