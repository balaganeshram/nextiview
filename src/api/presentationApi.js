// src/api/presentationApi.js

import api from "./axiosInstance";
import apiRoutes from "./apiRoutes";

export const createLemonSqueezyCheckout = async (planId) => {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    return {
      success: false,
      message: "Please sign in first.",
    };
  }

  if (!planId) {
    return {
      success: false,
      message: "Missing required planId.",
    };
  }

  const payload = {
    planId,
    userId,
  };

  try {
    const response = await api.post(apiRoutes.presentation.createCheckout, payload, {
      headers: {
        requiresAuth: true,
      },
    });

    if (response?.data?.checkoutUrl) {
      return {
        success: true,
        checkoutUrl: response.data.checkoutUrl,
      };
    } else {
      return {
        success: false,
        message: "Invalid response from server. Checkout URL missing.",
      };
    }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred while creating checkout.";

    return {
      success: false,
      message,
    };
  }
};
