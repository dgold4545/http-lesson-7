import axios from "axios";

axios.defaults.baseURL = "https://api.github.com/users/";

export const fetchUser = async (userName) => {
  const response = await axios.get(userName);

  return response;
};
