import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            About Us
          </Typography>
          <Box mt={2}>
            <Typography variant="body1" paragraph>
              Welcome to our platform! We are dedicated to providing top-notch services to our
              users. Our mission is to make your experience seamless and enjoyable.
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2023, our team is passionate about innovation, technology, and customer
              satisfaction. We believe in creating a strong community and continuously improving
              our platform to meet your needs.
            </Typography>
            <Typography variant="body1">
              Thank you for choosing us. We look forward to serving you and making a difference
              together!
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutPage;
