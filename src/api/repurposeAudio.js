// src/api/repurposeAudio.js

import api from "./axiosInstance";
import apiRoutes from "./apiRoutes";

export const generateRepurposedContent = async ({
  audioFile,
  sectionsToGenerate,
  outputFormat,
}) => {
  const formData = new FormData();

  formData.append("AudioFile", audioFile);
  formData.append("UserId", sessionStorage.getItem("userId"));
  formData.append("SectionsToGenerate", sectionsToGenerate); // e.g., "summary,blog,tweet"
  formData.append("OutputFormat", outputFormat);
  formData.append("IncludeTranscription", "true");

  try {
    const response = await api.post(apiRoutes.repurpose.extractAudio, formData, {
      headers: {
        requiresAuth: true,
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // Important for file download
    });

    const contentType = response.headers["content-type"];

    if (contentType === "application/zip") {
      const blob = new Blob([response.data], { type: "application/zip" });
      const downloadUrl = window.URL.createObjectURL(blob);

      const disposition = response.headers["content-disposition"];
      const filenameMatch = disposition?.match(/filename="?([^"]+)"?/);
      const fileName = filenameMatch ? filenameMatch[1] : "repurposed.zip";

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      return {
        success: true,
        fileName,
        downloadUrl,
      };
    } else {
      // If it's a blob but not ZIP, treat it as an error
      const text = await response.data.text();
      const errorJson = JSON.parse(text);
      return {
        success: false,
        status: response.status, // real HTTP status
        message: errorJson.message || "Unexpected error occurred",
      };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        // Parse the JSON error message from 400 response
        try {
          const text = await error.response.data.text();
          const errorJson = JSON.parse(text);

          return {
            success: false,
            status: 400,
            message: errorJson.message || "Bad Request",
          };
        } catch {
          return {
            success: false,
            status: 400,
            message: "Bad Request",
          };
        }
      } else {
        // Other HTTP errors
        return {
          success: false,
          status: error.response.status,
          message: "Server error occurred",
        };
      }
    }

    // Network or unexpected error fallback
    return {
      success: false,
      status: "Failure",
      message: error.message || "Unexpected error",
    };
  }
};

//below for active plan check
export const checkActivePlan = async () => {
  try {
    const userId = sessionStorage.getItem("userId");

    const response = await api.get(`${apiRoutes.repurpose.checkActivePlan}?userId=${userId}`, {
      headers: {
        requiresAuth: true,
      },
    });

    if (response.status === 200) {
      const planId = response.data?.data?.planId ?? null;
      return {
        success: true,
        planId,
        data: response.data,
      };
    } else {
      return {
        success: false,
        status: response.status,
        message: response.data?.message || "Unexpected error occurred",
      };
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        // Return specific error message from backend
        return {
          success: false,
          status: 400,
          message: error.response.data?.message || "Bad Request",
        };
      } else {
        // Generic message for other status codes
        return {
          success: false,
          status,
          message: "Something went wrong while checking your plan.",
        };
      }
    }

    // Catch-all for unknown issues (network, etc.)
    return {
      success: false,
      status: "Failure",
      message: error.message || "Unexpected error occurred",
    };
  }
};
