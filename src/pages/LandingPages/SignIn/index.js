import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Oval } from "react-loader-spinner"; // Added loader

// MUI components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Images
import bgImage from "assets/images/bg_signin.jpg";
import brandLogo from "assets/images/bgicon1.png";
import { useUser } from "context/UserContext";

// API & Session
import { validateOrCreateUser } from "api/loginApi";
import { saveToSession } from "utils/sessionHelper";

function SignInBasic() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loader state

  // Function to handle API call and navigation after successful login
  const handlePostLogin = async (name, email) => {
    setLoading(true); // Show loader
    try {
      // API call to backend to validate or create user
      const backendResponse = await validateOrCreateUser({ userName: name, mailId: email });
      const { userId, token } = backendResponse.data;

      if (userId && token) {
        saveToSession("userId", userId);
        saveToSession("authToken", token);
        // ✅ Properly set full user context here
        login({ name, email, userId, bearerToken: token });
      }

      navigate("/presentation");
    } catch (error) {
      console.error("Login or backend validation failed:", error);
    } finally {
      setLoading(false); // Just in case navigate fails
    }
  };

  // Check if the user is already logged in with Google
  const checkLoggedInStatus = () => {
    const googleToken = localStorage.getItem("googleToken"); // Retrieve stored Google Token (if any)
    if (googleToken) {
      // Decode token and validate session
      const decoded = jwtDecode(googleToken);
      const { name, email } = decoded;

      // Proceed with backend API call if token is valid
      handlePostLogin(name, email);
    }
  };

  useEffect(() => {
    // On page load, check if the user is already logged in
    checkLoggedInStatus();

    // Trigger Google One Tap auto-login (if the user is already logged in)
    window.google.accounts.id.prompt(); // This will trigger auto-login if the user is already authenticated
  }, []);

  const handleLoginSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    const decoded = jwtDecode(googleToken);
    const { name, email } = decoded;

    login({ name, email });

    // API call to backend
    handlePostLogin(name, email);
  };

  const handleLoginFailure = () => {
    console.error("Google Login Failed or Cancelled");
  };

  return (
    <>
      {/* Background */}
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Sign-in Box */}
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={6} lg={5} xl={4}>
            <Card sx={{ p: 5, borderRadius: "2xl", textAlign: "center", boxShadow: 6 }}>
              <MKBox
                component="img"
                src={brandLogo}
                alt="Nexti View Logo"
                width="120px"
                mx="auto"
                mb={2}
              />

              <MKTypography variant="h3" color="info" fontWeight="bold" mb={1}>
                Welcome to <span style={{ color: "#344767" }}>Nexti View</span>
              </MKTypography>
              <MKTypography variant="h6" color="textSecondary" mb={3}>
                Your Creative AI Partner
              </MKTypography>

              <Divider sx={{ my: 3 }} />

              {loading ? (
                <MKBox display="flex" justifyContent="center" alignItems="center" height="100px">
                  <Oval
                    height={60}
                    width={60}
                    color="#1976d2"
                    secondaryColor="#ccc"
                    strokeWidth={4}
                    visible={true}
                    ariaLabel="loading"
                  />
                </MKBox>
              ) : (
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                  useOneTap
                  render={(renderProps) => (
                    <MKButton
                      fullWidth
                      variant="gradient"
                      color="info"
                      onClick={renderProps.onClick}
                      startIcon={<GoogleIcon />}
                      size="small"
                      sx={{
                        py: 1.5,
                        fontSize: "1rem",
                        backgroundColor: "red !important",
                        color: "white !important",
                        "&:hover": {
                          transform: "scale(1.05) !important",
                          backgroundColor: "#c1351d !important",
                        },
                        transition: "all 0.3s ease !important",
                      }}
                    >
                      Sign in with Google
                    </MKButton>
                  )}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </MKBox>

      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
