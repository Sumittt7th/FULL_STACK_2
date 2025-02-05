import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home"); // Redirect to the home page or any desired route
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
      }}
    >
      <Typography variant="h1" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" mb={3}>
        It seems you've reached a page that isn't available.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
