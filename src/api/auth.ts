import axios from "axios";
import { ObjectId } from "bson";

const API_URL = "http://localhost:5000";

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
  try {
    const _id = new ObjectId().toString();
    const userData = {
      _id,
      ...data,
    };
    const response = await axios.post(`${API_URL}/auth`, userData, { withCredentials: true });
    await syncData();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
    await syncData();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const syncData = async () => {
  const localHabits = JSON.parse(localStorage.getItem('habits') || '[]');
  if (localHabits.length > 0) {
    await axios.post(`${API_URL}/habits/sync`, { habits: localHabits }, { withCredentials: true });
    localStorage.removeItem('habits');
  }
}

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