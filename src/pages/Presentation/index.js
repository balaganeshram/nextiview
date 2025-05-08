import React from "react";
import { Container, Grid, Button } from "@mui/material";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// Importing Images
import bgImage from "assets/images/bg5.jpg";
import fileUpload from "assets/images/shapes/fileupload.gif";
import fileprocess from "assets/images/shapes/videoprocessing.gif";
import fileDownload from "assets/images/shapes/filedownload2.gif";

// Default Navbar and Footer
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

const Presentation = () => {
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
              })}
            >
              Repurpose Your Videos Effortlessly
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="left"
              px={{ xs: 0, lg: 0 }}
              mt={1}
            >
              Upload your video or YouTube link, and in just one click, generate a full blog post,
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
            fontFamily="Poppins, sans-serif"
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
            fontFamily="Poppins, sans-serif"
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
                  fontFamily="Poppins, sans-serif"
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
                    maxWidth: "120px",
                    mb: 2,
                  }}
                />

                <MKTypography
                  variant="body1"
                  color="text.secondary"
                  fontFamily="Poppins, sans-serif"
                  opacity={0.9}
                >
                  Upload a video file or simply paste the YouTube link to get started.
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
                  fontFamily="Poppins, sans-serif"
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
                    maxWidth: "120px",
                    mb: 2,
                  }}
                />

                <MKTypography
                  variant="body1"
                  color="text.secondary"
                  fontFamily="Poppins, sans-serif"
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
                  fontFamily="Poppins, sans-serif"
                >
                  3. Download and Share
                </MKTypography>

                {/* GIF */}
                <MKBox
                  component="img"
                  src={fileDownload}
                  alt="Download Animation"
                  sx={{
                    width: "100%",
                    maxWidth: "120px",
                    mb: 2,
                  }}
                />

                <MKTypography
                  variant="body1"
                  color="text.secondary"
                  fontFamily="Poppins, sans-serif"
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
          <MKTypography variant="h6" align="center" mb={4} opacity={0.8}>
            When you upload a video or link, you will get:
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
              {[
                { title: "Basic", price: "$9", id: "basic" },
                { title: "Pro", price: "$19", id: "pro" },
                { title: "Premium", price: "$29", id: "premium" },
              ].map((plan) => (
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

                    {/* Bullet points using MUI List for proper alignment */}
                    <List dense disablePadding sx={{ mb: 2 }}>
                      {[
                        "50 AI Credits/month",
                        "100+ languages supported",
                        "Custom watermark",
                        "Email support",
                      ].map((point, index) => (
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
            Upload a video or paste a YouTube link — and watch the magic happen!
          </MKTypography>
          <Grid container justifyContent="center">
            <Button
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

      {/* Footer Section */}
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default Presentation;
