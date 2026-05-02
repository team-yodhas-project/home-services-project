import API from '../../utils/axios';

export const registerUserAPI = (data) => API.post("/auth/register", data);
export const loginUserAPI = (data) => API.post("/auth/login", data);
export const getProfileAPI = () => API.get("/auth/profile");