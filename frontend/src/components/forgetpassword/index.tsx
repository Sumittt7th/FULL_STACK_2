import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../services/auth.api"; // Assume API hook exists
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  email: string;
}

 /**
   * The validation schema for the form using Yup, ensuring that the email is in a valid format and required.
   * 
   * @type {yup.ObjectSchema<FormData>}
   */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

/**
 * ForgotPasswordPage component provides a form for users to request a password reset link by entering their email address.
 * It uses React Hook Form for form validation and submission, and Toast for showing success or error messages.
 *
 * @returns {JSX.Element} - The rendered Forgot Password page JSX with form and messages.
 */
const ForgotPasswordPage: React.FC = () => {
  /**
   * React Hook Form's `useForm` hook is used to handle form submission, validation, and error management.
   * The form is validated using the `yupResolver` for schema validation.
   *
   * @type {object}
   * @property {function} register - Registers the input field for form handling.
   * @property {function} handleSubmit - Handles form submission.
   * @property {object} formState - Contains form errors.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  /**
   * Mutation hook for sending a password reset link to the user's email.
   * The hook provides loading state during the API request.
   *
   * @type {function}
   */
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  /**
   * Handles the form submission for requesting a password reset link.
   * It triggers the `forgotPassword` mutation with the entered email.
   *
   * @param {FormData} data - The form data containing the email entered by the user.
   * @returns {Promise<void>} - A promise that resolves when the password reset request is complete.
   */
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      console.error("Failed to send reset link:", error);
      toast.error("Failed to send reset link. Please try again.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: "2rem auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={isLoading}
        >
          Send Reset Link
        </Button>
      </form>
    </Paper>
  );
};

export default ForgotPasswordPage;
