import React, { useEffect } from "react";
import { Container, Grid, Button } from "@mui/material";
import ProductDemoVideo from "components/ProductDemoVideo";
import FAQSection from "components/FAQSection";
import SupportedLanguagesSection from "components/SupportedLanguages";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

// Importing Images
import bgImage from "assets/images/bg5.jpg";
import fileUpload from "assets/images/shapes/fileupload.gif";
import fileprocess from "assets/images/shapes/videoprocessing.gif";
import fileDownload from "assets/images/shapes/filedownload2.gif";

// Default Navbar and Footer
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import { Link, useNavigate } from "react-router-dom";

//API call
import api from "api/axiosInstance";
import apiRoutes from "api/apiRoutes";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

const Presentation = () => {
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const authToken = sessionStorage.getItem("authToken");
    // If either value is missing, clear local storage to force fresh login
    if (!userId || !authToken) {
      localStorage.clear();
    }
  }, []);

  const plans = [
    {
      title: "Starter",
      price: "$12",
      id: "basic",
      planId: "2",
      features: [
        "400 Mins AI Credits/month",
        "30+ languages supported",
        "Transcription Only allowed",
        "Email support",
      ],
    },
    {
      title: "Regular",
      price: "$17",
      id: "pro",
      planId: "3",
      features: [
        "450 Mins AI Credits/month",
        "30+ languages supported",
        "All Repurpose features",
        "Priority support",
      ],
    },
    {
      title: "Premium",
      price: "$30",
      id: "premium",
      planId: "4",
      features: [
        "1000 Mins AI Credits/month",
        "30+ languages supported",
        "All Repurpose features",
        "Top Priority support",
      ],
    },
  ];
  // Handle subscribe button related api calls
  const navigate = useNavigate();
  const handleSubscribeClick = async (planId) => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("authToken");
    if (!userId || !token) {
      Swal.fire({
        title: "Hold on!",
        text: "Please Sign-in first to subscribe.",
        icon: "warning",
        confirmButtonText: "Go to Sign-in",
        background: "#fff",
        customClass: {
          popup: "swal2-rounded",
          confirmButton: "material-ui-confirm-button",
        },
      }).then(() => {
        navigate("/pages/authentication/sign-in");
      });
      return;
    }

    try {
      const response = await api.post(
        apiRoutes.presentation.createCheckout,
        { planId, userId },
        { headers: { requiresAuth: true } }
      );

      const checkoutUrl = response.data?.checkoutUrl;
      if (checkoutUrl) {
        const newTab = window.open(checkoutUrl, "_blank");
        if (newTab) newTab.focus();
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Checkout URL not received. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
          background: "#fff",
          customClass: {
            popup: "swal2-rounded",
            confirmButton: "material-ui-confirm-button",
          },
        });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong during checkout.";

      Swal.fire({
        title: "Checkout Failed",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
        background: "#fff",
        customClass: {
          popup: "swal2-rounded",
          confirmButton: "material-ui-confirm-button",
        },
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <DefaultNavbar routes={routes} sticky />

      {/* Hero Section */}
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "flex",
          alignItems: "center", // vertically center the content
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="flex-start" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              textAlign="left"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
                fontWeight: "bold",
                position: "relative",
                display: "inline-block",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  backgroundImage: "linear-gradient(45deg, #FF5722, #FF9800, #FFC107)", // Glow color gradient
                  filter: "blur(10px)",
                  zIndex: -1,
                  animation: "glowEffect 1.5s infinite alternate",
                },
                animation: "textGlow 1.5s ease-in-out infinite alternate",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.8)", // Subtle glow effect
              })}
            >
              Repurpose Your Videos Effortlessly
            </MKTypography>

            {/* Adding keyframes for the glow effect */}
            <style>
              {`
    @keyframes glowEffect {
      0% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(255, 87, 34, 0.5), 0 0 20px rgba(255, 87, 34, 0.5);
      }
      100% {
        transform: scale(1.1);
        box-shadow: 0 0 30px rgba(255, 87, 34, 0.8), 0 0 60px rgba(255, 87, 34, 0.8);
      }
    }
    @keyframes textGlow {
      0% {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6);
      }
      100% {
        text-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 25px rgba(255, 255, 255, 0.8);
      }
    }
  `}
            </style>

            <MKTypography
              variant="body1"
              color="white"
              textAlign="left"
              px={{ xs: 0, lg: 0 }}
              mt={1}
            >
              Upload your video, and in just one click, transcript, generate a full blog post,
              social media posts, and more!
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      {/* How It Works Section */}
      <MKBox component="section" py={8} bgcolor="neutral.100">
        <Container>
          {/* Section Header */}
          <MKTypography
            variant="h3"
            align="center"
            mb={2}
            fontFamily="'Roboto Slab', sans-serif"
            fontWeight="600"
            color="primary.main"
            sx={{ textTransform: "uppercase", letterSpacing: "1px" }}
          >
            How It Works
          </MKTypography>
          <MKTypography
            variant="h6"
            align="center"
            mb={4}
            opacity={0.8}
            fontFamily="'Roboto Slab', sans-serif"
            color="text.secondary"
          >
            It&apos;s as simple as 1-2-3. Here&apos;s how you can get started!
          </MKTypography>

          <Grid container spacing={4} justifyContent="center">
            {/* Step 1: Upload Video */}
            <Grid item xs={12} sm={4}>
              <MKBox
                textAlign="center"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3,
                  minHeight: "350px",
                  bgcolor: "#E0F7FA",
                  borderRadius: "8px",
                  boxShadow: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <MKTypography
                  variant="h6"
                  color="primary.main"
                  mb={2}
                  fontWeight="600"
                  fontFamily="'Roboto Slab', sans-serif"
                >
                  1. Upload Your Video
                </MKTypography>

                {/* GIF */}
                <MKBox
                  component="img"
                  src={fileUpload}
                  alt="Upload File Animation"
                  sx={{
                    width: "100%",
                    maxWidth: "150px", // Matching the size with the second GIF
                    mb: 2,
                    objectFit: "contain", // Ensures GIF keeps aspect ratio
                  }}
                />

                <MKTypography
                  variant="body1"
                  color="text.secondary"
                  fontFamily="'Roboto Slab', sans-serif"
                  opacity={0.9}
                >
                  Upload a video file simply to get started.
                </MKTypography>
              </MKBox>
            </Grid>

            {/* Step 2: Let It Process */}
            <Grid item xs={12} sm={4}>
              <MKBox
                textAlign="center"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3,
                  minHeight: "350px",
                  bgcolor: "#FFEBEE",
                  borderRadius: "8px",
                  boxShadow: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <MKTypography
                  variant="h6"
                  color="primary.main"
                  mb={2}
                  fontWeight="600"
                  fontFamily="'Roboto Slab', sans-serif"
                >
                  2. Let It Process
                </MKTypography>

                {/* GIF */}
                <MKBox
                  component="img"
                  src={fileprocess}
                  alt="Processing Animation"
                  sx={{
                    width: "100%",
                    maxWidth: "150px", // Matching the size with the first GIF
                    mb: 2,
                    objectFit: "contain", // Ensures GIF keeps aspect ratio
                  }}
                />

                <MKTypography
                  variant="body1"
                  color="text.secondary"
                  fontFamily="'Roboto Slab', sans-serif"
                  opacity={0.9}
                >
                  Our AI will analyze the video and generate content in seconds!
                </MKTypography>
              </MKBox>
            </Grid>

            {/* Step 3: Download and Share */}
            <Grid item xs={12} sm={4}>
              <MKBox
                textAlign="center"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3,
                  minHeight: "350px",
                  bgcolor: "#F1F8E9",
                  borderRadius: "8px",
                  boxShadow: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <MKTypography
                  variant="h6"
                  color="primary.main"
                  mb={2}
                  fontWeight="600"
                  fontFamily="'Roboto Slab', sans-serif"
                >
                  3. Download and Share
                </MKTypography>

                {/* GIF */}
                {/* GIF for Step 3: Download and Share */}
                <MKBox
                  component="img"
                  src={fileDownload}
                  alt="Download Animation"
                  sx={{
                    width: "100%",
                    maxWidth: "150px", // Limiting the width to 120px for consistency
                    height: "120px", // Explicitly setting the height to 120px to match the others
                    mb: 2,
                    objectFit: "contain", // Ensure the aspect ratio is preserved
                  }}
                />

                <MKTypography
                  variant="body1"
                  color="text.secondary"
                  fontFamily="'Roboto Slab', sans-serif"
                  opacity={0.9}
                >
                  Get a full SEO blog post, social media snippets, and more in one click!
                </MKTypography>
              </MKBox>
            </Grid>
          </Grid>
        </Container>
      </MKBox>

      {/* Features / Deliverables Section */}
      <MKBox component="section" py={8} bgcolor="white" sx={{ backgroundColor: "#fff !important" }}>
        <Container>
          <MKTypography variant="h3" align="center" mb={2}>
            What You will Get
          </MKTypography>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <MKTypography variant="h5" align="center" fontWeight="bold" color="primary" mb={4}>
              🎉 Try our tool with <span style={{ color: "#00b894" }}>30 minutes</span> free AI
              credits!
            </MKTypography>
          </motion.div>
          <MKTypography variant="h6" align="center" mb={4} opacity={0.8}>
            When you upload a video, you will get:
          </MKTypography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <MKBox textAlign="center">
                <MKTypography variant="h5" color="primary" mb={2}>
                  📝 Full SEO Blog Post
                </MKTypography>
                <MKTypography variant="body1" opacity={0.7}>
                  Generate a blog post optimized for SEO in seconds.
                </MKTypography>
              </MKBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MKBox textAlign="center">
                <MKTypography variant="h5" color="primary" mb={2}>
                  📄 Clean Transcript
                </MKTypography>
                <MKTypography variant="body1" opacity={0.7}>
                  Get a readable transcript for your video.
                </MKTypography>
              </MKBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MKBox textAlign="center">
                <MKTypography variant="h5" color="primary" mb={2}>
                  💬 Social Media Posts
                </MKTypography>
                <MKTypography variant="body1" opacity={0.7}>
                  Generate 1–3 ready-to-post social media updates.
                </MKTypography>
              </MKBox>
            </Grid>
          </Grid>
          {/* Demo video call happening here */}
          <ProductDemoVideo />
        </Container>
      </MKBox>

      {/* Pricing Section */}
      <MKBox component="section" py={8} bgcolor="grey.100">
        <Container>
          <MKTypography variant="h3" align="center" mb={2} fontWeight="600" color="primary.main">
            Pricing
          </MKTypography>
          <MKTypography variant="h6" align="center" mb={6} color="text.secondary" opacity={0.8}>
            Choose the plan that suits you best
          </MKTypography>

          {/* White Background Container for Pricing Plans */}
          <MKBox
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: 4,
              boxShadow: 3,
            }}
          >
            <Grid container spacing={4} justifyContent="center">
              {plans.map((plan) => (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                  <MKBox
                    p={4}
                    textAlign="center"
                    borderRadius="12px"
                    bgcolor="background.paper"
                    boxShadow={1}
                    border="1px solid #e0e0e0"
                    sx={{
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                        borderColor: "#bdbdbd",
                      },
                    }}
                  >
                    <MKTypography variant="h4" color="primary" mb={1}>
                      {plan.title}
                    </MKTypography>
                    <MKTypography variant="h2" color="text.primary" mb={2}>
                      {plan.price}
                      <span style={{ fontSize: "16px", color: "#888" }}>/month</span>
                    </MKTypography>

                    <List dense disablePadding sx={{ mb: 2 }}>
                      {plan.features.map((point, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            justifyContent: "center",
                            fontSize: "0.95rem",
                            paddingY: "4px",
                          }}
                        >
                          ✅ {point}
                        </ListItem>
                      ))}
                    </List>

                    <MKButton
                      component={Link}
                      to="/extract-audio"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      id={`btn-try-${plan.id}`}
                      sx={{ mb: 1 }}
                    >
                      Try Now
                    </MKButton>

                    <MKButton
                      variant="contained"
                      color="primary"
                      fullWidth
                      id={`btn-subscribe-${plan.id}`}
                      onClick={() => handleSubscribeClick(plan.planId)}
                    >
                      Subscribe Now
                    </MKButton>
                  </MKBox>
                </Grid>
              ))}
            </Grid>
          </MKBox>
        </Container>
      </MKBox>

      {/* Supported Languages Section */}
      <SupportedLanguagesSection />
      {/* Final CTA Section */}
      <MKBox
        component="section"
        py={8}
        sx={{
          backgroundColor: "#ffffff", // force white background
          color: "black", // ensure text is visible on white
        }}
      >
        <Container>
          <MKTypography variant="h3" align="center" mb={2}>
            Ready to Repurpose Your Videos in Seconds?
          </MKTypography>
          <MKTypography variant="h6" align="center" mb={4} sx={{ opacity: 0.8 }}>
            Upload a video — and watch the magic happen!
          </MKTypography>
          <Grid container justifyContent="center">
            <Button
              component={Link}
              to="/extract-audio"
              id="ctaGetStarted"
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                borderRadius: "50px",
                px: 4,
                color: "white !important",
                fontWeight: "bold",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.08)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)", // optional: more glow on hover
                },
              }}
            >
              Get Started Now
            </Button>
          </Grid>
        </Container>
      </MKBox>
      {/* FAQ Section */}
      <MKBox component="section" py={8} bgcolor="grey.100">
        <Container>
          <FAQSection />
        </Container>
      </MKBox>
      {/* Footer Section */}
      <DefaultFooter content={footerRoutes} />
    </>
  );
};

export default Presentation;
