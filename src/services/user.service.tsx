import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'users');
  }

  getUserBoard() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }
}
const instance = new UserService();
export default instance;
