export const PROFILE_STORAGE_KEY = 'officestore-demo-profile';

export function loadStoredProfile() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(window.localStorage.getItem(PROFILE_STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

export function saveStoredProfile(profile) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
