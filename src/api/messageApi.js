// src/api/messageApi.js

import api from "./axiosInstance";
import apiRoutes from "./apiRoutes";

const sendMessage = async ({ userName, mailId, message }) => {
  if (!userName || !mailId || !message) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  try {
    const response = await api.post(apiRoutes.message.send, {
      userName,
      mailId,
      message,
    });

    // ✅ Check status code only
    if (response.status === 200) {
      return {
        success: true,
        message: "Message sent successfully.",
      };
    } else {
      return {
        success: false,
        message: "Failed to send message.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while sending the message.",
    };
  }
};

const messageApi = {
  sendMessage,
};

export default messageApi;
