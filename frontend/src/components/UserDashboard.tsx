import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"; // Adjust to your store file's path
import { useGetUserByIdQuery } from "../services/user.api";
import { useGetAllTransactionsQuery } from "../services/transaction.api";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { pageAnimation, textAnimation, updatedTextAnimation } from "../animation"; // Import animations

const Dashboard: React.FC = () => {
  const { _id: userId } = useSelector((state: RootState) => state.auth.user);

  if (!userId) {
    return <Typography>Error: User ID is missing.</Typography>;
  }

  // Fetch user details using the ID
  const { data, isLoading, isError } = useGetUserByIdQuery(userId);
  const { data: transactions, isLoading: transactionsLoading, isError: transactionsError } = useGetAllTransactionsQuery();
  const navigate = useNavigate();

  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (transactions?.data && transactions?.data.length > 0) {
      setRecentTransactions(transactions.data.slice(0, 3)); // Show only the first 3 transactions
    }
  }, [transactions]);

  if (isLoading || transactionsLoading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton variant="text" width="60%" height={30} sx={{ mt: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 3 }} />
        </Paper>
      </Container>
    );
  }

  if (isError || transactionsError || !data) {
    return <Typography>Error fetching data!</Typography>;
  }

  const user = data.data; // Access the `data` field inside the response

  return (
    <motion.div variants={pageAnimation} initial="hidden" animate="show" exit="exit">
      <Container>
        <motion.div variants={textAnimation}>
          <Typography variant="h4" gutterBottom>
            User Dashboard
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {/* Wallet Balance */}
          <Grid item xs={12} sm={4}>
            <motion.div variants={updatedTextAnimation}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" color="textSecondary">
                  Wallet Balance
                </Typography>
                <Typography variant="h4">{user.walletBalance} ₹</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/transaction")}
                >
                  Add Balance
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Recent Transactions Table */}
          <Grid item xs={12} sm={8}>
            <motion.div variants={updatedTextAnimation}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Transactions
                </Typography>

                {recentTransactions.length === 0 ? (
                  <Typography>No transactions found.</Typography>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Transaction with</strong></TableCell>
                          <TableCell><strong>Amount (₹)</strong></TableCell>
                          <TableCell><strong>Type</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
  {recentTransactions.map((txn: any) => {
    const isSender = txn.userId?._id === userId;
    const transactionWith = isSender
      ? txn.receiverId?.name || "N/A"
      : txn.userId?.name || "N/A";

    const isNegative = txn.type === "TRANSFER" || txn.type === "WITHDRAW";
    const formattedAmount = isNegative
      ? `- ₹${txn.amount}`
      : `+ ₹${txn.amount}`;
    const amountColor = isNegative ? "red" : "green";

    return (
      <TableRow key={txn._id}>
        <TableCell>{transactionWith}</TableCell>
        <TableCell style={{ color: amountColor, fontWeight: "bold" }}>
          {formattedAmount}
        </TableCell>
        <TableCell>{txn.type}</TableCell>
        <TableCell
          style={{
            color: txn.status === "APPROVED" ? "green" :
                   txn.status === "REJECTED" ? "red" : "black",
          }}
        >
          {txn.status}
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

                    </Table>
                  </TableContainer>
                )}

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate("/all_transactions")}
                  sx={{ mt: 3 }}
                >
                  View All Transactions
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Dashboard;
