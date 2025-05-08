import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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

//API & Session
import { validateOrCreateUser } from "api/loginApi";
import { saveToSession } from "utils/sessionHelper";

function SignInBasic() {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    try {
      const decoded = jwtDecode(googleToken);
      const { name, email } = decoded;

      console.log("Google Login Success:", { name, email });
      login({ name, email });

      // API call to backend to validate or create user
      const backendResponse = await validateOrCreateUser({ userName: name, mailId: email });

      const { userId, token } = backendResponse.data;
      if (userId && token) {
        saveToSession("userId", userId);
        saveToSession("authToken", token);
      }

      // Navigate after storing user session data
      navigate("/presentation");
    } catch (error) {
      console.error("Login or backend validation failed:", error);
    }
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
              {/* Logo */}
              <MKBox
                component="img"
                src={brandLogo}
                alt="Nexti View Logo"
                width="120px"
                mx="auto"
                mb={2}
              />

              {/* Welcome Text */}
              <MKTypography variant="h3" color="info" fontWeight="bold" mb={1}>
                Welcome to <span style={{ color: "#344767" }}>Nexti View</span>
              </MKTypography>
              <MKTypography variant="h6" color="textSecondary" mb={3}>
                Your Creative AI Partner
              </MKTypography>

              <Divider sx={{ my: 3 }} />

              {/* Google Sign-In Button */}
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                useOneTap
                render={(renderProps) => (
                  <MKButton
                    fullWidth
                    variant="gradient"
                    color="info" // Use "info" color for the button's background
                    onClick={renderProps.onClick}
                    startIcon={<GoogleIcon />}
                    size="small"
                    sx={{
                      py: 1.5,
                      fontSize: "1rem",
                      backgroundColor: "red !important", // Add !important to force red background
                      color: "white !important", // Force white text color
                      "&:hover": {
                        transform: "scale(1.05) !important", // Zoom-in effect on hover with !important
                        backgroundColor: "#c1351d !important", // Darker red on hover with !important
                      },
                      transition: "all 0.3s ease !important", // Smooth transition for hover effect
                    }}
                  >
                    Sign in with Google
                  </MKButton>
                )}
              />
            </Card>
          </Grid>
        </Grid>
      </MKBox>

      {/* Footer */}
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
