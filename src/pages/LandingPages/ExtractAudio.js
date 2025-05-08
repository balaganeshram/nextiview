import React, { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

// Material Kit Components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";

const ExtractAudio = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const ffmpeg = new FFmpeg({ log: true });

  const loadFfmpeg = async () => {
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }
  };

  const handleExtractAudio = async () => {
    if (!videoFile) return;

    setLoading(true);
    await loadFfmpeg();

    const fileExt = videoFile.name.split(".").pop().toLowerCase();
    const inputFileName = `input.${fileExt}`;

    const fileData = await videoFile.arrayBuffer();
    await ffmpeg.writeFile(inputFileName, new Uint8Array(fileData));

    // Extract audio with compression (128k bitrate)
    await ffmpeg.exec([
      "-i",
      inputFileName,
      "-vn",
      "-ar",
      "44100",
      "-ac",
      "2",
      "-b:a",
      "128k",
      "output.mp3",
    ]);

    const output = await ffmpeg.readFile("output.mp3");
    const audioBlob = new Blob([output.buffer], { type: "audio/mp3" });
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);
    setLoading(false);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setAudioUrl(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/webm": [".webm"],
      "video/x-m4v": [".m4v"],
      "video/*": [],
    },
    multiple: false,
  });

  const BlackFontButton = styled(Button)({
    color: `black !important`,
    borderColor: `black !important`,
    "&:hover": {
      backgroundColor: "#f0f0f0 !important",
      borderColor: "black !important",
      color: "black !important",
    },
  });

  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f5f7fa", padding: 2 }}
      >
        <Card sx={{ width: "100%", maxWidth: 500, p: 2, borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              🎵 Extract Audio from Video
            </Typography>

            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #aaa",
                borderRadius: 2,
                padding: 3,
                textAlign: "center",
                backgroundColor: isDragActive ? "#e3f2fd" : "#fafafa",
                cursor: "pointer",
                mb: 2,
              }}
            >
              <input {...getInputProps()} />
              <Typography>
                {videoFile
                  ? `📁 ${videoFile.name}`
                  : isDragActive
                  ? "Drop the video file here..."
                  : "Click or drag and drop a video file here"}
              </Typography>
            </Box>

            {videoPreview && (
              <Box mb={2}>
                <video src={videoPreview} controls width="100%" style={{ borderRadius: 8 }} />
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              color="success"
              disabled={!videoFile || loading}
              onClick={handleExtractAudio}
              startIcon={loading ? <CircularProgress size={20} /> : <AudiotrackIcon />}
              sx={{ mb: 2 }}
            >
              {loading ? "Processing..." : "Extract Audio"}
            </Button>

            {audioUrl && (
              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight="medium">
                  🎧 Your Audio File
                </Typography>
                <audio controls src={audioUrl} style={{ width: "100%", marginTop: 8 }} />
                <Box mt={1}>
                  <BlackFontButton
                    href={audioUrl}
                    download="extracted-audio.mp3"
                    variant="outlined"
                    fullWidth
                  >
                    Download MP3
                  </BlackFontButton>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
      <DefaultFooter content={footerRoutes} />
    </>
  );
};

export default ExtractAudio;
