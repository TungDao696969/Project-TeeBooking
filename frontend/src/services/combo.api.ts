import api from "@/lib/axios";

export const getFoodCombos = async () => {
  const response = await api.get("/food");

  return response.data.data;
};
