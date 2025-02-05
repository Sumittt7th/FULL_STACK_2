import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useChangePasswordMutation } from "../../services/user.api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { pageAnimation, textAnimation, formVariants, inputVariants, buttonVariants } from "../../animation";

const schema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().min(6, "Password must be at least 6 characters long").required("New password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("newPassword")], "Passwords must match").required("Confirm password is required"),
});

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const { _id: userId } = useSelector((state: RootState) => state.auth.user);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await changePassword({
        id: userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      reset();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to change the password. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div variants={pageAnimation} initial="hidden" animate="show" exit="exit">
      <Container>
        <Paper elevation={3} sx={{ textAlign: "center", padding:3}}>
          <motion.div variants={textAnimation}>
            <Typography variant="h4" gutterBottom>
              Change Password
            </Typography>
          </motion.div>

          <motion.form variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleSubmit(onSubmit)}>
            <motion.div variants={inputVariants}>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("currentPassword")}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading} sx={{ mt: 2 }}>
                {isLoading ? "Changing Password..." : "Change Password"}
              </Button>
            </motion.div>
          </motion.form>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default ChangePassword;
