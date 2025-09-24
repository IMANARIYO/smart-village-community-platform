import type { UserProfile } from "../authTypes";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

export class UserProfileStorage {
  private static readonly STORAGE_KEY = "user_profile_data";
  private static readonly CACHE_EXPIRY_KEY = "user_profile_expiry";
  private static readonly CACHE_DURATION = 30 * 60 * 1000;

  static setUserProfile(profile: UserProfile): void {
    try {
      const expiryTime = Date.now() + this.CACHE_DURATION;
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      sessionStorage.setItem(this.CACHE_EXPIRY_KEY, expiryTime.toString());
    } catch (error) {
      console.warn("Failed to save user profile to sessionStorage:", error);
    }
  }

  static getUserProfile(): UserProfile | null {
    try {
      const expiryTime = sessionStorage.getItem(this.CACHE_EXPIRY_KEY);

      if (!expiryTime || Date.now() > parseInt(expiryTime)) {
        this.clearUserProfile();
        return null;
      }

      const profileData = sessionStorage.getItem(this.STORAGE_KEY);
      return profileData ? JSON.parse(profileData) : null;
    } catch (error) {
      console.warn(
        "Failed to retrieve user profile from sessionStorage:",
        error
      );
      return null;
    }
  }

  static clearUserProfile(): void {
    try {
      sessionStorage.removeItem(this.STORAGE_KEY);
      sessionStorage.removeItem(this.CACHE_EXPIRY_KEY);
    } catch (error) {
      console.warn("Failed to clear user profile from sessionStorage:", error);
    }
  }

  static isProfileCached(): boolean {
    try {
      const expiryTime = sessionStorage.getItem(this.CACHE_EXPIRY_KEY);
      return expiryTime !== null && Date.now() <= parseInt(expiryTime);
    } catch (error) {
      console.warn("Failed to check profile cache:", extractErrorMessage(error));
      return false;
    }
  }
}
