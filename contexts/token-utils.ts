import { LoginPayload } from "@/types/login-payload";
import { LoginType } from "@/utils/fake-data";
import { Storage } from "@/utils/storage";
import { jwtDecode } from "jwt-decode";

// Decode JWT and get expiration time (in milliseconds)
export const getTokenExpiration = (token: string): number | null => {
  try {
    if (!token) return null;
    const decoded = jwtDecode<{ exp?: number }>(token);
    return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Define the type for the refreshAccessToken function
type LoginWithRefreshTokenFn = (
  payload: LoginPayload
) => Promise<{ refreshToken: any; userToken: any }>;

// Schedule token refresh 1 minute before expiry
export const scheduleTokenRefresh = async (
  token: string,
  refreshToken: string,
  refreshAccessToken: LoginWithRefreshTokenFn
): Promise<void> => {
  if (!token) return;
  const expirationTime = getTokenExpiration(token);

  // If the token is invalid or already expired, do nothing
  if (!expirationTime || expirationTime <= Date.now()) {
    console.warn("Token is invalid or already expired.");
    return;
  }

  // Calculate the time to refresh (5 minute before expiry)
  const currentTime = Date.now();
  const fiveMinutesInMs = 5 * 60 * 1000;
  const fiveMinutesBeforeExpiration = expirationTime - fiveMinutesInMs;
  const delay = fiveMinutesBeforeExpiration - currentTime;

  // If the refresh time is valid, set a timeout to refresh the token
  if (delay > 0) {
    setTimeout(async () => {
      try {
        // Call the refreshAccessToken function
        const response = await refreshAccessToken({
          loginType: LoginType.REFRESH_TOKEN,
          loginWithRefreshToken: {
            refreshToken,
            tenantId: Storage.getTenantId(),
          },
        });

        // If refresh is successful, get the new token and schedule the next refresh
        if (response?.userToken) {
          // Save the new token as needed
          Storage.setAdminAuthToken(JSON.stringify(response));

          // Recursively schedule the next refresh
          scheduleTokenRefresh(
            response.userToken,
            response.refreshToken,
            refreshAccessToken
          );
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }, delay);
  } else {
    console.warn("Token is expiring soon or already expired.");
  }
};
