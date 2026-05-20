import api from "@/lib/axios";

export const getHome = async () => {
  const res = await api.get("/home");
  return res.data.data;
};
