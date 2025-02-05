import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useResetPasswordMutation } from "../../services/auth.api";
import { toast } from "react-toastify";

/**
 * ResetPassword component provides a form for users to reset their password using a token passed via URL query parameters.
 * It checks for the validity of the token, compares the entered passwords, and submits the reset request.
 *
 * @returns {JSX.Element} - The rendered Reset Password page with form and error messages.
 */
const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Extract the token from the query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token");
    }
  }, [token]);

  /**
   * Handles the form submission, including validation of the password fields and token.
   * Sends the password reset request if everything is valid.
   *
   * @param {React.FormEvent} event - The submit event from the form.
   * @returns {Promise<void>} - A promise that resolves when the password reset process is complete.
   */
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Token is missing");
      return;
    }

    try {
      setError(null);
      await resetPassword({
        token: token,
        password: newPassword,
      }).unwrap();

      toast.success("Password reset successfully. Please log in.");
      navigate("/auth");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "An error occurred while resetting the password.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
