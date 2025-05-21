// src/api/apiRoutes.js

const apiRoutes = {
  user: {
    validateOrCreate: "/Login/login", // endpoint for SSO user check
    //getProfile: '/user/profile', // optional: for getting user details by ID
  },
  repurpose: {
    extractAudio: "/Transcript/generate",
    checkActivePlan: "/Transcript/check-activeplan",
  },
  presentation: {
    createCheckout: "/Payment/create-checkout", // <--- Added route
  },
  message: {
    send: "/Message/sendmessage",
  },
};

export default apiRoutes;
