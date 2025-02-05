import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Typography, TextField, Button, Paper, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEditUserMutation } from "../../services/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageAnimation, textAnimation, formVariants, inputVariants, buttonVariants } from "../../animation";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
});

interface FormData {
  name: string;
  email: string;
}

const EditProfile: React.FC = () => {
  const { _id: userId } = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [updateUser, { isLoading }] = useEditUserMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await updateUser({ id: userId, ...data }).unwrap();
      toast.success("Profile updated successfully");
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <motion.div variants={pageAnimation} initial="hidden" animate="show" exit="exit">
      <Container>
        <Paper elevation={3} sx={{ textAlign: "center", padding: 3 }}>
          <motion.div variants={textAnimation}>
            <Typography variant="h4" gutterBottom>
              Edit Profile
            </Typography>
          </motion.div>
          {isLoading ? (
            <>
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="100%" height={56} sx={{ mt: 2 }} />
              <Skeleton variant="text" width="100%" height={56} sx={{ mt: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 3 }} />
            </>
          ) : (
            <motion.form variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleSubmit(onSubmit)}>
              <motion.div variants={inputVariants}>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </motion.div>

              <motion.div variants={inputVariants}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </motion.div>

              <motion.div variants={buttonVariants}>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading} sx={{ mt: 2 }}>
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </motion.div>
            </motion.form>
          )}
        </Paper>
      </Container>
    </motion.div>
  );
};

export default EditProfile;
