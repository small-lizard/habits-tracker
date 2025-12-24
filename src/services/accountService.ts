import { ObjectId } from "bson";
import { http } from "./http";

export const checkAuth = async () => {
  try {
    const { data } = await http.get('/auth/check');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const registerUser = async (useData: { name?: string; email: string; password: string }) => {
  const localHabits = JSON.parse(localStorage.getItem('habits') || '[]');

  try {
    const id = new ObjectId().toString();
    const fullUserData = {
      id,
      habits: localHabits,
      ...useData,
    };
    const { data } = await http.post('/auth', fullUserData);

    localStorage.removeItem('habits');

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const loginUser = async (userData: { email: string; password: string }) => {
  const localHabits = JSON.parse(localStorage.getItem('habits') || '[]');

  try {

    const fullUserData = {
      habits: localHabits,
      ...userData,
    };

    const { data } = await http.post('/login', fullUserData);

    localStorage.removeItem('habits');

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await http.post('/logout', {});
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    await http.delete('/delete-account');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePassword = async (data: { password: string, newPassword: string }) => {
  try {
    await http.put('/change-password', data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};