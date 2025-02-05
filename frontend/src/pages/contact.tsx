import React from "react";
import { Container, Typography, Card, CardContent, Box, TextField, Button } from "@mui/material";

const ContactPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Have questions or need assistance? Fill out the form below, and we'll get back to you
            as soon as possible.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} mt={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactPage;
