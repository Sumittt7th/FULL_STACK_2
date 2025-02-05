// auth.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Paper, Box, Link } from "@mui/material";
import { useLoginMutation, useSignUpMutation } from "../../services/auth.api";
import { useAppDispatch } from "../../store/store";
import { setTokens } from "../../store/reducers/authReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import { pageAnimation, textAnimation, formVariants, updatedTextAnimation, inputVariants, buttonVariants } from "../../animation"; 

interface FormData {
  email: string;
  password: string;
  name?: string; // Used for signup
}

const AuthPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [signup, { isLoading: signupLoading }] = useSignUpMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (activeForm === "login") {
      try {
        const response = await login({
          email: data.email,
          password: data.password,
        }).unwrap();
        dispatch(setTokens(response.data));
        toast.success("Login Successful");
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed. Please try again.");
      }
    } else if (activeForm === "signup") {
      try {
        await signup({
          name: data.name!,
          email: data.email,
          password: data.password,
        }).unwrap();
        toast.success("Signup Successful. Please login.");
        setActiveForm("login");
      } catch (error) {
        console.error("Signup failed:", error);
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <motion.div variants={pageAnimation} initial="hidden" animate="show" exit="exit">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          margin: "2rem auto",
          textAlign: "center",
        }}
      >
        <motion.div variants={textAnimation}>
          <Typography variant="h4" gutterBottom>
            {activeForm === "login" ? "Login" : "Sign Up"}
          </Typography>
        </motion.div>

        <motion.form variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleSubmit(onSubmit)}>
          {activeForm === "signup" && (
            <motion.div variants={inputVariants}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                {...register("name")}
              />
            </motion.div>
          )}
          <motion.div variants={inputVariants}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email")}
            />
          </motion.div>
          <motion.div variants={inputVariants}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
            />
          </motion.div>

          <motion.div variants={buttonVariants}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={loginLoading || signupLoading}
            >
              {activeForm === "login" ? "Login" : "Sign Up"}
            </Button>
          </motion.div>
        </motion.form>

        <Box mt={2}>
          {activeForm === "login" && (
            <>
              <motion.div variants={updatedTextAnimation}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link
                    component="button"
                    onClick={() => setActiveForm("signup")}
                    sx={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </motion.div>
              <motion.div variants={updatedTextAnimation}>
                <Typography variant="body2" mt={1}>
                  <Link
                    component="button"
                    onClick={() => navigate("/forgot-password")}
                    sx={{ textDecoration: "none", fontWeight: "bold" ,color:"red"}}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
              </motion.div>
            </>
          )}
          {activeForm === "signup" && (
            <motion.div variants={updatedTextAnimation}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  component="button"
                  onClick={() => setActiveForm("login")}
                  sx={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  Login
                </Link>
              </Typography>
            </motion.div>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default AuthPage;
