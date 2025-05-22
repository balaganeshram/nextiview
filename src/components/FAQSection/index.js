import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How can i contact Nextiview?",
    answer: "You can send an email to nextiviewofficial@gmail.com",
  },
  {
    question: "Is my uploaded video file stored on your servers?",
    answer:
      "No. We do not store your video files on our servers. All uploads are processed securely and deleted immediately after conversion.",
  },
  {
    question: "Do you save the repurposed content I generate?",
    answer:
      "Absolutely not. The content you generate (transcripts, blog posts, captions, etc.) is not stored or logged. Your privacy and content ownership are fully respected.",
  },
  {
    question: "What file formats are supported for upload?",
    answer:
      "Currently, we support most common video formats like MP4, MOV, and WebM. If you run into any issues, let us know and we&apos;ll try to support your format.",
  },
  {
    question: "What types of content can your tool generate from a video?",
    answer:
      "We can automatically generate transcripts, blog posts, Instagram captions, Twitter posts, and email newsletters — all in just a few clicks.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const FAQSection = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Can&apos;t find what you&apos;re looking for? Contact our support team for more help.
        </Typography>
      </motion.div>

      {/* Accordion List */}
      <Box>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
          >
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};

export default FAQSection;
