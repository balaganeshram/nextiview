import api from "./axiosInstance";
import apiRoutes from "./apiRoutes";

export const validateOrCreateUser = async ({ userName, mailId }) => {
  try {
    const response = await api.post(
      apiRoutes.user.validateOrCreate,
      { userName, mailId },
      {
        headers: {
          requiresAuth: false,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("validateOrCreateUser failed:", error);
    throw error;
  }
};
