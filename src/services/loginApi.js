import axios from 'axios';

const LOGIN_URL = 'http://127.0.0.1:8000/api/users/login/';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(LOGIN_URL, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
