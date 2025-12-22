import axios from "axios";
import { ObjectId } from "bson";

const API_URL = process.env.API_URL || "http://localhost:5000";

if (!API_URL) {
  throw new Error('API_URL is not defined');
}

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/check`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const registerUser = async (data: { name?: string; email: string; password: string }) => {
  const localHabits = JSON.parse(localStorage.getItem('habits') || '[]');

  try {
    const id = new ObjectId().toString();
    const userData = {
      id,
      habits: localHabits,
      ...data,
    };
    const response = await axios.post(`${API_URL}/auth`, userData, { withCredentials: true });

    localStorage.removeItem('habits');

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const loginUser = async (data: { email: string; password: string }) => {
  const localHabits = JSON.parse(localStorage.getItem('habits') || '[]');

  try {

    const userData = {
      habits: localHabits,
      ...data,
    };

    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });

    localStorage.removeItem('habits');

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${API_URL}/delete-account`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePassword = async (data: { password: string, newPassword: string }) => {
  try {
    const response = await axios.put(`${API_URL}/change-password`, data, { withCredentials: true });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};