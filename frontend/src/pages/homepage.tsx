import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion for animation
import { pageAnimation, textAnimation, buttonVariants } from '../animation'; // Import your animation variants

const HomePage: React.FC = () => {
  return (
    <>
      <motion.div
        variants={pageAnimation} // Apply page animation
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
          <Box textAlign="center">
            <motion.div variants={textAnimation}>
              <Typography variant="h3" gutterBottom>
                Welcome to MyWebsite!
              </Typography>
            </motion.div>
            <motion.div variants={textAnimation}>
              <Typography variant="h6" paragraph>
                This is the homepage. You can add more content here, such as features, updates, or news about your website.
              </Typography>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button variant="contained" color="primary" href="/about">
                Learn More About Us
              </Button>
            </motion.div>
          </Box>
        </Container>
      </motion.div>
    </>
  );
};

export default HomePage;
