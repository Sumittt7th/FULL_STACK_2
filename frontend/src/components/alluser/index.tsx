import React from "react";
import { useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from "../../services/user.api"; // Replace with your actual API file
import { Container, Grid, Card, CardContent, Typography, Box, Skeleton, Button } from "@mui/material";
import { motion } from "framer-motion"; // Import Framer Motion for animation
import { toast } from "react-toastify"; // Import react-toastify for notifications

const AllUsers: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();  // Hook for deleting user
  const [updateUser] = useUpdateUserMutation();  // Hook for updating user

  const handleDelete = async (id: string) => {
    try {
      await deleteUser({ id }).unwrap();  // Delete user
      toast.success("User deleted successfully!"); // Success toast notification
      refetch();  // Refetch users to update the list
    } catch (error) {
      toast.error("Failed to delete user."); // Error toast notification
      console.error("Failed to delete user", error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      // You can set up a form to update user data here.
      const updatedData = { name: "Updated User", email: "updated@example.com" }; // Example data
      await updateUser({ id, ...updatedData }).unwrap();
      toast.success("User updated successfully!"); // Success toast notification
    } catch (error) {
      toast.error("Failed to update user."); // Error toast notification
      console.error("Failed to update user", error);
    }
  };

  return (
    <Container>
      {/* Header section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">All Users</Typography>
      </Box>

      {/* Display loading skeletons while data is loading */}
      {isLoading ? (
        <Grid container spacing={3} sx={{ mt: 3}}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Typography variant="h6" color="error" sx={{ mt: 5 }}>
          Failed to load users.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {data?.data?.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {user.email}
                    </Typography>

                    {/* Update and Delete Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleUpdate(user._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AllUsers;
