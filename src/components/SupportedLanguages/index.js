import React from "react";
import { Typography, Container, Chip, Grid, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import LanguageIcon from "@mui/icons-material/Language";
import languageOptions from "utils/languageOptions";

const fadeInStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const SupportedLanguagesSection = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          🌐 Supported Languages
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Our tool supports content generation in a wide range of languages to help you reach a
          global audience.
        </Typography>
      </motion.div>

      {/* Language Grid */}
      <Grid container spacing={2} justifyContent="center">
        {languageOptions.map((lang, index) => (
          <Grid item key={lang.code}>
            <motion.div
              variants={fadeInStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              whileHover={{
                y: -4,
                boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
              }}
            >
              <Chip
                icon={<LanguageIcon />}
                label={lang.label}
                variant="outlined"
                sx={{
                  fontSize: "0.875rem",
                  px: 1.5,
                  py: 1,
                  borderRadius: "999px",
                  cursor: "pointer",
                  backgroundColor: theme.palette.mode === "dark" ? "#2b2b2b" : "#ffffff",
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SupportedLanguagesSection;
