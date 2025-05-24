import React, { useState } from "react";
import { Checkbox, MenuItem, Select, FormControl, ListItemText } from "@mui/material";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useDropzone } from "react-dropzone";
import MKBox from "components/MKBox";
import {
  Typography,
  Button,
  Box,
  Container,
  CircularProgress,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
// Material Kit Components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgImage from "assets/images/city-profile.jpg";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Stepper, Step, StepLabel } from "@mui/material";
import languageOptions from "utils/languageOptions";
//Import API call
import { generateRepurposedContent } from "api/repurposeAudio";
import { checkActivePlan } from "api/repurposeAudio";

const ExtractAudio = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  //const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [audioFile, setAudioFile] = useState(null); // filled by handleUpload
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepMessage, setStepMessage] = useState("Starting generation...");
  const [showToast, setShowToast] = useState({ open: false, message: "", type: "success" });
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Upload", "Generate", "Download"];
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedFileType, setSelectedFileType] = React.useState("docx");
  const [downloadUrl, setDownloadUrl] = React.useState(null);
  const [planId, setPlanId] = useState(null);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("en");
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const navigate = useNavigate();

  useEffect(
    () => {
      const userId = sessionStorage.getItem("userId");
      const authToken = sessionStorage.getItem("authToken");

      if (!userId || !authToken) {
        Swal.fire({
          title: "Hold on!",
          text: "Please Re-Sign/Sign-in first to repurpose your file",
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
        return; // stop further execution if no userId or authToken
      }

      // Now that userId and authToken are available, check active plan
      const fetchPlan = async () => {
        const result = await checkActivePlan();
        if (result.success && result.planId != null) {
          setPlanId(result.planId); // save planId in state
          console.log("Plan ID is", planId);
        } else {
          // Show error from API or fallback
          Swal.fire({
            title: "Error",
            text: result.message || "Could not verify active plan.",
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

      fetchPlan();

      // Cleanup function to revoke blob URL if it exists when component unmounts or downloadUrl changes
      return () => {
        if (downloadUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(downloadUrl);
          setDownloadUrl(null); // reset state to avoid using revoked URL
        }
      };
    },
    [navigate, downloadUrl, setDownloadUrl],
    [planId]
  );

  // Dropdown css style
  const labelStyle = {
    fontSize: 13,
    fontWeight: "bold",
    mb: 0.5,
    display: "block",
  };

  const selectStyle = {
    fontSize: 13,
    minHeight: 42,
    "& .MuiSelect-select": {
      py: "6px",
    },
  };

  //Multi select dropdown code
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const options = ["Blog", "SEO", "Instagram", "Newsletter", "Twitter/X"]; //"Transcribe"
  //below started the video to audio coversion logic
  const ffmpeg = new FFmpeg({ log: true });

  const loadFfmpeg = async () => {
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }
  };
  // Upload button handle logic for spliting audio file with progress
  const handleUpload = async () => {
    if (!videoFile) return;
    setIsGenerating(false);
    setIsGenerated(false);
    setStepMessage("Starting upload...");
    setUploadProgress(0);
    setUploadCompleted(false);
    setShowGenerateButton(false);
    setShowToast({ open: false, message: "", type: "" });
    setUploading(true);
    setFinalizing(false);
    setActiveStep(0); // Step 1: Upload
    setAudioFile(null); // clear previous audio
    setDownloadUrl(null);

    let progress = 0;

    const progressInterval = setInterval(() => {
      if (progress < 90) {
        progress += 5;
        setUploadProgress(progress);
      } else {
        clearInterval(progressInterval);
        setFinalizing(true); // Show spinner
      }
    }, 300);

    try {
      await loadFfmpeg();
      const fileExt = videoFile.name.split(".").pop().toLowerCase();
      const inputFileName = `input.${fileExt}`;
      // 🧹 Clear old files (prevent fs conflict)
      try {
        ffmpeg.FS("unlink", inputFileName);
      } catch (e) {
        // Ignore if file doesn't exist
      }
      try {
        ffmpeg.FS("unlink", "output.mp3");
      } catch (e) {
        // Ignore if file doesn't exist
      }
      // start audio extraction
      const fileData = await videoFile.arrayBuffer();
      await ffmpeg.writeFile(inputFileName, new Uint8Array(fileData));

      await ffmpeg.exec([
        "-i",
        inputFileName,
        "-vn",
        "-af",
        "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=1:stop_periods=1:stop_threshold=-50dB:stop_silence=1",
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
      const mp3File = new File([audioBlob], "output.mp3", { type: "audio/mp3" });
      setAudioFile(mp3File);
      setUploadCompleted(true); // ✅ mark upload as completed
      setShowGenerateButton(true);
    } catch (err) {
      console.error("Audio extraction failed", err);
      Swal.fire("Error", "Audio conversion failed. Please try again.", "error");
    } finally {
      clearInterval(progressInterval);
      setFinalizing(false);
      setUploadProgress(100);
      setUploading(false);
    }
  };

  // Generate now button handle logic for api call
  const handleGenerateNow = async () => {
    if (!audioFile) {
      setShowToast({ open: true, message: "Audio not uploaded yet!", type: "error" });
      return;
    }

    const sectionsString = selectedOptions.join(",");
    setIsGenerating(true);
    setStepMessage("🎙️ Transcribing the uploaded file...");
    setActiveStep(1); // Step 2: Generate

    try {
      const result = await generateRepurposedContent({
        audioFile,
        sectionsToGenerate: sectionsString,
        languageCode: selectedLanguageCode,
        outputFormat: selectedFileType,
      });

      if (result.success) {
        setStepMessage("📦 Finalizing and preparing your download...");
        setActiveStep(2); // Step 3: Download
        setIsGenerated(true);
        setShowToast({ open: true, message: "File generated successfully!", type: "success" });

        // ✅ Save the URL for manual download
        setDownloadUrl(result.downloadUrl);

        // ✅ Trigger download only once
        if (!hasDownloaded) {
          const link = document.createElement("a");
          link.href = result.downloadUrl;
          link.download = result.fileName || "repurposed.zip";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setHasDownloaded(true); // prevent future auto-downloads
        }
      } else {
        setShowToast({ open: true, message: result.message, type: "error" });
      }
    } catch (err) {
      console.log(err);
      setShowToast({ open: true, message: "Unexpected error occurred", type: "error" });
    } finally {
      setIsGenerating(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const videoURL = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoURL;

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;
      const maxDurationSeconds = 31 * 60; // 31 minutes

      if (duration > maxDurationSeconds) {
        Swal.fire({
          icon: "error",
          title: "Too Long!",
          text: "Please upload a video that is 30 minutes or less.",
        });
        return;
      }

      // Reset states when new file is accepted
      setVideoFile(file);
      setVideoPreview(videoURL);
      setUploadCompleted(false); // Re-enable Upload button
      setShowGenerateButton(false); // Hide Generate Now button until audio converted
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/webm": [".webm"],
      "video/x-m4v": [".m4v"],
      "video/x-matroska": [".mkv"],
      "video/*": [],
    },
    multiple: false,
  });

  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox
        minHeight="10rem"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      />
      <MKBox component="section" py={8} bgcolor="white" sx={{ backgroundColor: "#fff !important" }}>
        <Container>
          <Box
            sx={{
              margin: "0 auto",
              justifyContent: "center",
              width: "90%",
              maxWidth: 800,
              bgcolor: "white",
              p: 4,
              borderRadius: 4,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <AutorenewIcon color="primary" />
              Start Repurposing Your Video
            </Typography>

            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #aaa",
                borderRadius: 2,
                p: 3,
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
                <video
                  src={videoPreview}
                  controls
                  width="100%"
                  style={{ borderRadius: 8, maxHeight: 240 }} // 👈 Reduced height
                />
              </Box>
            )}

            {videoPreview && (
              <Box mb={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={uploading || uploadCompleted}
                  onClick={handleUpload}
                  sx={{
                    width: { xs: "80%", sm: "50%" },
                    mx: "auto",
                    fontWeight: "bold",
                    backgroundColor: "#3949ab",
                    color: "white !important",
                    "&:hover": {
                      backgroundColor: "#1a237e",
                    },
                    mb: 2,
                  }}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </Button>

                {uploading && (
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <Typography variant="caption">
                      {finalizing
                        ? "Finalizing audio conversion..."
                        : `Uploading Video... ${uploadProgress}%`}
                    </Typography>

                    <Box
                      sx={{
                        height: 10,
                        backgroundColor: "#e0e0e0",
                        borderRadius: 5,
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: `${uploadProgress}%`,
                          height: "100%",
                          backgroundColor: finalizing ? "#ff9800" : "#3f51b5",
                          transition: "width 0.3s ease-in-out",
                        }}
                      />
                    </Box>

                    {finalizing && (
                      <Box display="flex" justifyContent="center" mt={1}>
                        <CircularProgress size={24} color="warning" />
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}
            {/* Dropdowns in a responsive row layout */}
            <Box
              mb={3}
              display="flex"
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems="flex-end"
            >
              {/* Language Dropdown */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={labelStyle}>
                  Select Video Language
                </Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <Select
                    id="language-select"
                    value={selectedLanguageCode}
                    onChange={(e) => setSelectedLanguageCode(e.target.value)}
                    displayEmpty
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 240, // 5–7 items visible
                          overflowY: "auto",
                        },
                      },
                    }}
                    sx={selectStyle}
                  >
                    {languageOptions.map((lang) => (
                      <MenuItem key={lang.code} value={lang.code} sx={{ fontSize: 13 }}>
                        {lang.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Repurpose Options Multi-select */}
              {planId !== 2 && (
                <Box sx={{ flex: 1, maxWidth: 300 }}>
                  <Typography variant="caption" sx={labelStyle}>
                    Select Repurpose Options
                  </Typography>
                  <FormControl fullWidth variant="outlined" size="small">
                    <Select
                      id="transcriptionOptions"
                      multiple
                      value={selectedOptions}
                      onChange={handleSelectChange}
                      renderValue={(selected) => selected.join(", ")}
                      displayEmpty
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 240,
                            overflowY: "auto",
                          },
                        },
                      }}
                      sx={selectStyle}
                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option} sx={{ fontSize: 13 }}>
                          <Checkbox checked={selectedOptions.includes(option)} />
                          <ListItemText primary={<span style={{ fontSize: 13 }}>{option}</span>} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* File Type Dropdown */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={labelStyle}>
                  Download File Type
                </Typography>
                <FormControl fullWidth variant="outlined" size="small">
                  <Select
                    id="fileType"
                    value={selectedFileType}
                    onChange={(e) => setSelectedFileType(e.target.value)}
                    displayEmpty
                    sx={selectStyle}
                  >
                    <MenuItem value="docx" sx={{ fontSize: 13 }}>
                      DOCX
                    </MenuItem>
                    <MenuItem value="txt" sx={{ fontSize: 13 }}>
                      TXT
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Generate Now Button */}
            {showGenerateButton && audioFile && !isGenerated && (
              <Button
                variant="contained"
                startIcon={<AutoAwesomeIcon sx={{ color: "white" }} />}
                onClick={handleGenerateNow}
                disabled={isGenerating}
                sx={{
                  mb: 3,
                  width: { xs: "80%", sm: "50%" },
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F83ab7",
                  color: "white !important",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#5e35b1",
                    boxShadow: "0px 0px 10px #9575cd",
                  },
                }}
              >
                {isGenerating ? "Generating..." : "Generate Now"}
              </Button>
            )}

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2, mb: 2 }}>
              {steps.map((label, index) => (
                <Step key={label} completed={activeStep > index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {isGenerated && downloadUrl && (
              <Box mt={2}>
                <Typography variant="body2">
                  {"If download didn't start automatically, "}
                  <a href={downloadUrl} download="repurposed.zip">
                    click here to download manually
                  </a>
                  .
                </Typography>
              </Box>
            )}
            {isGenerating && (
              <Card
                sx={{
                  mt: 2,
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderLeft: "5px solid #1976d2",
                  animation: "fadeIn 0.8s ease-in-out",
                }}
              >
                <CircularProgress size={28} color="primary" />
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {stepMessage}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Please wait while we generate your content...
                  </Typography>
                </Box>
              </Card>
            )}

            <Snackbar
              open={showToast.open}
              autoHideDuration={6000}
              onClose={() => setShowToast({ ...showToast, open: false })}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                severity={showToast.type}
                onClose={() => setShowToast({ ...showToast, open: false })}
              >
                {showToast.message}
              </Alert>
            </Snackbar>
          </Box>
        </Container>
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default ExtractAudio;
