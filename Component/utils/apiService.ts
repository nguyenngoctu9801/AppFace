import axios from 'axios';
import { getToken } from './requestUltils';


const createHeaders = async () => {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// GET request
export const getApi = async (url: string, params = {}, other = {}) => {
    try {
        const headers = await createHeaders();
        return axios.get(url, { params, headers, ...other });
    } catch (error) {
        console.error("Error in getApi:", error);
        throw error;
    }
};

// POST request
export const postApi = async (url: string, data = {}, other = {}) => {
    try {
        const headers = await createHeaders();
        return axios.post(url, data, { headers, ...other });
    } catch (error) {
        console.error("Error in postApi:", error);
        throw error;
    }
};

// PUT request
export const putApi = async (url: string, data = {}, other = {}) => {
    try {
        const headers = await createHeaders();
        return axios.put(url, data, { headers, ...other });
    } catch (error) {
        console.error("Error in putApi:", error);
        throw error;
    }
};

// DELETE request
export const deleteApi = async (url: string, params = {}, other = {}) => {
    try {
        const headers = await createHeaders();
        return axios.delete(url, { params, headers, ...other });
    } catch (error) {
        console.error("Error in deleteApi:", error);
        throw error;
    }
};
