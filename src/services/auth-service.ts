import apiClient from "../config/api-client";
import type { AuthRequest } from "../model/AuthRequest";
import type { AuthResponse } from "../model/AuthResponse";
import type { Profile } from "../model/Profile";

export const createProfile = (profile: Profile) => {
  return apiClient.post<Profile>("/register", profile);
};

export const authenticate = (authRequest: AuthRequest) => {
  return apiClient.post<AuthResponse>("/login", authRequest);
};

export const signout = () => {
  return apiClient.post<void>("/signout");
};
