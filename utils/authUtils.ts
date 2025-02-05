import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';

const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';
const EXPIRY_TIME_NAME = 'expiryTime';

/**
 * Refreshes the Gmail access token using the stored refresh token.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_NAME);
        if (!refreshToken) {
            console.error('No refresh token found!');
            return null;
        }

        const response = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id:
                    '499007111473-iolrcekl6kfjh9mkc80lm59h582vtjah.apps.googleusercontent.com',
                client_secret: 'CLIENT_SECRET',
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            }).toString(),
        });

        const data = await response.json();

        if (data.access_token) {
            await AsyncStorage.setItem(ACCESS_TOKEN_NAME, data.access_token);

            // Store expiry time (current time + expires_in seconds)
            const expiryTime = Date.now() + data.expires_in * 1000;
            await AsyncStorage.setItem(EXPIRY_TIME_NAME, expiryTime.toString());

            console.log('New access token stored:', data.access_token);
            return data.access_token;
        } else {
            console.error('Failed to refresh access token:', data);
            return null;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
};

/**
 * Retrieves a valid Gmail access token, refreshing if necessary.
 */
export const getAccessToken = async (): Promise<string | null> => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_NAME);
    const expiryTime = await AsyncStorage.getItem(EXPIRY_TIME_NAME);

    if (token && expiryTime) {
        const expiresAt = parseInt(expiryTime, 10);
        if (Date.now() < expiresAt - 5 * 60 * 1000) {
            // Token is still valid, return it
            return token;
        }
    }

    console.warn('Access token expired! Refreshing...');
    return await refreshAccessToken();
};

/**
 * Automatically refresh access token in the background.
 */
// TODO: Invoke on mount
export const startTokenAutoRefresh = async () => {
    const expiryTime = await AsyncStorage.getItem(EXPIRY_TIME_NAME);

    if (expiryTime) {
        const expiresAt = parseInt(expiryTime, 10);
        const refreshTime = expiresAt - 5 * 60 * 1000; // 5 mins before expiry

        const delay = refreshTime - Date.now();
        if (delay > 0) {
            setTimeout(async () => {
                await refreshAccessToken();
                startTokenAutoRefresh(); // Restart refresh cycle
            }, delay);
        }
    }
};
