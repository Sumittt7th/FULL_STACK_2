import React from "react";
import { useGetAllTransactionsQuery } from "../../services/transaction.api";
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
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TransactionHistoryPage: React.FC = () => {
  const { _id: userId } = useSelector((state: RootState) => state.auth.user);
  const { data: transactions, isLoading, error } = useGetAllTransactionsQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">Failed to load transactions</Typography>;

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 10);

    const tableColumn = ["Transaction With", "Amount (₹)", "Type", "Status", "Date"];
    const tableRows: any[] = [];

    transactions?.data?.forEach((txn) => {
      const isSender = txn.userId?._id === userId;
      const isReceiver = txn.receiverId?._id === userId;
      const transactionWith = isSender ? txn.receiverId?.name || "N/A" : txn.userId?.name || "N/A";

      let formattedAmount = `₹${txn.amount}`;
      if (txn.status === "APPROVED") {
        if (isSender && (txn.type === "TRANSFER" || txn.type === "WITHDRAW")) {
          formattedAmount = `- ₹${txn.amount}`;
        } else if (isReceiver || txn.type === "DEPOSIT") {
          formattedAmount = `+ ₹${txn.amount}`;
        }
      }

      const row = [
        transactionWith,
        formattedAmount,
        txn.type,
        txn.status,
        new Date(txn.createdAt).toLocaleDateString(),
      ];
      tableRows.push(row);
    });

    // AutoTable to format the data
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Transaction_History.pdf");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4">Transaction History</Typography>
        <Button variant="contained" color="primary" onClick={generatePDF}>
          Download PDF
        </Button>
      </Box>

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
                const isSender = txn.userId?._id === userId;
                const isReceiver = txn.receiverId?._id === userId;
                const transactionWith = isSender ? txn.receiverId?.name || "N/A" : txn.userId?.name || "N/A";

                let amountColor = "black";
                let formattedAmount = `₹${txn.amount}`;

                if (txn.status === "APPROVED") {
                  if (isSender && (txn.type === "TRANSFER" || txn.type === "WITHDRAW")) {
                    formattedAmount = `- ₹${txn.amount}`;
                    amountColor = "red";
                  } else if (isReceiver || txn.type === "DEPOSIT") {
                    formattedAmount = `+ ₹${txn.amount}`;
                    amountColor = "green";
                  }
                }

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
