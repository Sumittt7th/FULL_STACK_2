import React from "react";
import { Box, Typography, Paper, Skeleton, Button, Grid, Card, CardContent, CardActions } from "@mui/material";
import { motion } from "framer-motion"; // Import Framer Motion
import { pageAnimation, textAnimation, updatedTextAnimation } from "../animation"; // Import animations
import { FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa"; // Example icons for stats

const AdminDashboard: React.FC = () => {
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
          padding: 3,
        }}
      >
        {/* Welcome Message */}
        <motion.div variants={textAnimation}>
          <Typography variant="h4" gutterBottom color="primary">
            Welcome to the Admin Dashboard!
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
                View and manage platform statistics, user data, and system settings.
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
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <FaUsers size={40} color="primary" />
                  <Typography variant="h6" gutterBottom>
                    Total Users
                  </Typography>
                  {isLoading ? (
                    <Skeleton variant="text" width="50%" height={30} />
                  ) : (
                    <Typography variant="h5">1,235</Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Users
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <FaDollarSign size={40} color="primary" />
                  <Typography variant="h6" gutterBottom>
                    Total Revenue
                  </Typography>
                  {isLoading ? (
                    <Skeleton variant="text" width="50%" height={30} />
                  ) : (
                    <Typography variant="h5">$5,243</Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Revenue
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <FaChartLine size={40} color="primary" />
                  <Typography variant="h6" gutterBottom>
                    Platform Health
                  </Typography>
                  {isLoading ? (
                    <Skeleton variant="text" width="50%" height={30} />
                  ) : (
                    <Typography variant="h5">Good</Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Stats
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Actionable Button Section */}
        <motion.div variants={updatedTextAnimation} initial="hidden" animate="show" exit="exit">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3 }}
              >
                Manage Users
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                variant="contained" 
                color="secondary" 
                fullWidth 
                sx={{ mt: 3 }}
              >
                View Reports
              </Button>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default AdminDashboard;
