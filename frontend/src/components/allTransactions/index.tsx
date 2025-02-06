import React from "react";
import { useGetAllTransactionsQuery } from "../../services/transaction.api"; // Adjust this import based on your actual service
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const TransactionHistoryPage: React.FC = () => {
  const { data: transactions, isLoading, error } = useGetAllTransactionsQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">Failed to load transactions</Typography>;

  return (
    <Box sx={{}}>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>

      {transactions?.length === 0 ? (
        <Typography>No transactions found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Transaction With</strong></TableCell>
                <TableCell><strong>Amount (₹)</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>International</strong></TableCell>
                <TableCell><strong>Commission Amount</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.data?.map((txn) => {
                const isSender = txn.userId?._id === txn.receiverId?._id;
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
                    <TableCell>{txn.isInternational ? "Yes" : "No"}</TableCell>
                    <TableCell>{txn.commissionAmount || "N/A"}</TableCell>
                    <TableCell>{new Date(txn.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TransactionHistoryPage;
