// src/components/ProductDemoVideo/index.js
import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

function ProductDemoVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Delay load to improve initial app performance
    const timeout = setTimeout(() => {
      setShowVideo(true);
    }, 2000); // Delay video load by 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        mt: 6,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        minHeight: "360px", // reserve height to avoid layout shift
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        >
          <source src="/videos/product-demo-min.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}

export default ProductDemoVideo;
