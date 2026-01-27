import { ObjectId } from "bson";
import { http } from "./http";

export const checkAuth = async () => {
    const { data } = await http.get('/auth/check');

    return data;
}

export const registerUser = async (useData: { name?: string; email: string; password: string }) => {
    const localHabits = getLocalHabits()
    const id = new ObjectId().toString();
    const fullUserData = {
        id,
        habits: localHabits,
        ...useData,
    };
    const { data } = await http.post('/auth', fullUserData);

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