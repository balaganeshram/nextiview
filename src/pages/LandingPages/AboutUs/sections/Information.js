import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="movie"
                    title="Repurpose Videos"
                    description="Turn long-form videos into short-form content, blogs, social posts, and more."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="schedule"
                    title="Save Time & Scale"
                    description="Automate content slicing and generate weeks of content in minutes."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="auto_awesome"
                    title="AI-Powered Summaries"
                    description="Generate summaries, headlines, and captions with powerful AI tools."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="share"
                    title="Multichannel Output"
                    description="Export content optimized for YouTube Shorts, Instagram Reels, LinkedIn, and more."
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              title="How AI is Transforming Content"
              description="Learn how creators and businesses are using AI to scale video marketing and boost engagement with repurposed content."
              action={{
                type: "internal",
                route: "pages/company/about-us",
                color: "info",
                label: "Find out more",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
