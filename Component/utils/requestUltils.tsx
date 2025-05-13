import AsyncStorage from '@react-native-async-storage/async-storage';
import authConfig from '../../config/auth';

const API_LOGIN = "https://central.basesystem.one/iam/api/v0/login-with-local";

export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(API_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                rememberMe: true,
            }),
        });

        const data = await response.json();

        if (response.ok && data.access_token) {
            await AsyncStorage.setItem(authConfig.storageTokenKeyName, data.access_token);
            await AsyncStorage.setItem("refresh_token", data.refresh_token);

            return data;
        } else {
            console.error(" Lỗi đăng nhập:", data);
            return null;
        }
    } catch (error) {
        console.error(" Lỗi khi gọi API đăng nhập:", error);
        return null;
    }
};


export const setToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(authConfig.storageTokenKeyName, token);

    } catch (error) {
        console.error("Error saving token:", error);
    }
};

// Lấy token từ AsyncStorage
export const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem(authConfig.storageTokenKeyName);
        return token;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
};

// Xóa token khi logout
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(authConfig.storageTokenKeyName);
    } catch (error) {
        console.error("Error removing token:", error);
    }
};
