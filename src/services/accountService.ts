import { http } from "./http";

export const warmUpServer = async () => {
    await http.get('/ping');
}

export const checkAuth = async () => {
    try {
        const { data } = await http.get('/auth/check');
        return { authenticated: true, ...data };
    } catch (err: any) {
        if (err?.response?.status === 401) {
             return { authenticated: false };
        }
        throw err;
    }
};

export const registerUser = async (useData: { name: string; email: string; password: string }) => {
    const savedLang = localStorage.getItem('lang') || 'ru';

    const fullUserData = {
        savedLang,
        ...useData,
    };
    const { data } = await http.post('/auth', fullUserData);

    return data;
}

export const sendOTP = async (email: string, name: string) => {
    const savedLang = localStorage.getItem('lang') || 'ru';

    const { data } = await http.post('/auth/otp', { email, name, savedLang });

    return data;
}

export const verifyEmail = async (email: string, code: string) => {
    const habits = getLocalHabits();

    const { data } = await http.post('/verify-email', { email, code, habits });
    setAuthState(data.sessionId);

    return data;
}

export const googleAuth = async (code: string) => {
    const habits = getLocalHabits();

    const { data } = await http.post('/auth/google/callback', { code, habits });
    setAuthState(data.sessionId);

    return data;
}

export const loginUser = async (userData: { email: string; password: string }) => {
    const localHabits = getLocalHabits()
    const fullUserData = {
        habits: localHabits,
        ...userData,
    };
    const { data } = await http.post('/login', fullUserData);
    setAuthState(data.sessionId);

    return data;
};

export const logoutUser = async () => {
    const { data } = await http.post('/logout', {});
    localStorage.setItem("guest_mode", "true");
    localStorage.removeItem("sessionId");

    return data;
};

export const deleteUser = async () => {
    await http.delete('/delete-account');
    localStorage.setItem("guest_mode", "true");
    localStorage.removeItem("sessionId");
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

const setAuthState = (sessionId?: string) => {
    if (!sessionId) return;

    localStorage.removeItem("habits");
    localStorage.setItem("guest_mode", "false");
    localStorage.setItem("sessionId", sessionId);
};