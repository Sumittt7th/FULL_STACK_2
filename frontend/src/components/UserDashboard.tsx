import React from "react";
import { Box, Typography, Paper, Skeleton, Button } from "@mui/material";
import { motion } from "framer-motion"; // Import Framer Motion
import { pageAnimation, textAnimation, updatedTextAnimation } from "../animation"; // Import animations

const UserDashboard: React.FC = () => {
  // Placeholder loading state
  const isLoading = false; // Set this to true to simulate loading

  return (
    <motion.div 
      initial="hidden" 
      animate="show" 
      exit="exit" 
      variants={pageAnimation} // Page animation for smooth transition
    >
      <Box
        component="main"
        sx={{
         
          bgcolor: "background.default",
        }}
      >
        {/* Welcome Message */}
        <motion.div variants={textAnimation}>
          <Typography variant="h4" gutterBottom color="primary">
            Welcome Back!
          </Typography>
        </motion.div>

        {/* Info Section */}
        <motion.div 
          variants={updatedTextAnimation}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Dashboard Overview
            </Typography>
            {isLoading ? (
              <Skeleton variant="text" width="80%" height={40} />
            ) : (
              <Typography variant="body1" color="textSecondary">
                View and manage your account settings and activity.
              </Typography>
            )}
          </Paper>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={updatedTextAnimation}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Stats
            </Typography>
            {isLoading ? (
              <Skeleton variant="text" width="50%" height={30} />
            ) : (
              <Typography variant="body1" color="textSecondary">
                Stay updated with the latest insights and progress on your activities.
              </Typography>
            )}
          </Paper>
        </motion.div>

        {/* Action Button */}
        <motion.div variants={updatedTextAnimation} initial="hidden" animate="show" exit="exit">
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 3 }}
          >
            Manage Settings
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default UserDashboard;
