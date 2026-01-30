import api from "../utils/api";

export const getProfile = async (token) => {
  const res = await api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
