export const StorageKeys = {
  AUTH_TOKEN: 'sf_auth_token',
} as const;

export const Storage = {
  // getTenantId: () => localStorage.getItem(StorageKeys.TENANT_ID) ?? '',
  // setTenantId: (value: string) =>
  //   localStorage.setItem(StorageKeys.TENANT_ID, value),
  // removeTenantId: () => localStorage.removeItem(StorageKeys.TENANT_ID),
  getAuthToken: () => localStorage.getItem(StorageKeys.AUTH_TOKEN) ?? '',
  setAuthToken: (value: string) =>
    localStorage.setItem(StorageKeys.AUTH_TOKEN, value),
  removeAuthToken: () => localStorage.removeItem(StorageKeys.AUTH_TOKEN),
};
