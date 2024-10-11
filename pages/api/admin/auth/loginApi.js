import axios from "axios";

const URL = "http://localhost:8000";

export const Login = async (data) => {
  try {
    const response = await axios.post(`/api/auth/login`, data, {
      "Content-Type": "application/json",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const verifyAuth = async (data) => {
  try {
    const response = await axios.get(`/api/auth/validuser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: data,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const Register = async (data) => {
  try {
    const response = await axios.post(`/api/auth/register`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const ForgotPass = async (data) => {
  try {
    const response = await axios.post(`/api/auth/forgot-password`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const ResetPass = async (data) => {
  try {
    const response = await axios.post(`/api/auth/reset-password`, data);
    return response;
  } catch (error) {
    // console.log("error",error)
    return error;
  }
};

export const MediaPost = async (data) => {
  try {
    const response = await axios.post("/api/media", data);
    return response;
  } catch (error) {
    // console.log("error",error)
    return error;
  }
};

export const GetMedia = async () => {
  try {
    const response = await axios.get("/api/media");
    return response;
  } catch (error) {
    // console.log("error",error)
    return error;
  }
};

// GetRolesPermission, RolesPermission, UpdateRoles, UpdateRolesPermission

export const RolesPermission = async (data) => {
  try {
    const response = await axios.post(`/api/roles-and-permissions`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetRolesPermission = async () => {
  try {
    const response = await axios.get(`/api/roles-and-permissions`);
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateRoles = async (data) => {
  try {
    const response = await axios.put(`/api/roles-and-permissions`, data);
    return response;
  } catch (error) {
    return error;
  }
};
