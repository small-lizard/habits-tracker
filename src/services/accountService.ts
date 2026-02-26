import { ObjectId } from "bson";
import { http } from "./http";

export const warmUpServer = async () => {
    await http.get('/ping');
}

export const checkAuth = async () => {
    const { data } = await http.get('/auth/check');

    return data;
}

export const registerUser = async (useData: { name: string; email: string; password: string }) => {
    const id = new ObjectId().toString();
    const savedLang = localStorage.getItem('lang') || 'ru';

    const fullUserData = {
        id,
        savedLang,
        ...useData,
    };
    const { data } = await http.post('/auth', fullUserData);

    return data;
}

export const verifyEmail = async (email: string, code: any) => {
    const localHabits = getLocalHabits();

    const { data } = await http.post('/verify-email', { email, code, localHabits});

    localStorage.removeItem('habits');

    return data;
}

export const loginUser = async (userData: { email: string; password: string }) => {
    const localHabits = getLocalHabits()
    const fullUserData = {
        habits: localHabits,
        ...userData,
    };
    const { data } = await http.post('/login', fullUserData);
    localStorage.removeItem('habits');

    return data;
};

export const logoutUser = async () => {
    const { data } = await http.post('/logout', {});

    return data;
};

export const deleteUser = async () => {
    await http.delete('/delete-account');
};

export const changePassword = async (data: { password: string, newPassword: string }) => {
    await http.put('/change-password', data);
};

const getLocalHabits = () => {
    try {
        return JSON.parse(localStorage.getItem('habits') ?? '[]');
    } catch {
        return [];
    }
};