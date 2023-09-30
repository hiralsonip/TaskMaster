import axios from "axios";

const API_URL = "http://localhost:3000/user/";

class AuthService {
  login(username: string, password: string) {

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);


    console.log("data", params.toString());
    return axios
      .post(API_URL + "login", params.toString())
      .then(response => {
        console.log("dataaaaaa after login", JSON.stringify(response.data))
        console.log("token", response.data.token)
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", response.data.token);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  register(username: string, password: string, first_name: string,
    last_name: string, email: string, profile_picture: string, phone_number: string) {
    console.log("register", "registerrrrrrrrrr" + username,
      password,
      first_name,
      last_name,
      email,
      profile_picture,
      phone_number)

    // const data = {
    //   username,
    //   password,
    //   first_name,
    //   last_name,
    //   email,
    //   profile_picture,
    //   phone_number
    // };

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('first_name', first_name);
    params.append('last_name', last_name);
    params.append('email', email);
    params.append('profile_picture', profile_picture);
    params.append('phone_number', phone_number);


    console.log("data", params.toString());
    return axios.post(API_URL + "register", params.toString());
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}
const instance = new AuthService();
export default instance;
