import React, { useState } from "react";
import {
  useGetAllApprovalsQuery,
  useCheckBalanceMutation,
  useUpdateApprovalMutation,
} from "../../services/approval.api";
import { useUpdateTransactionMutation } from "../../services/transaction.api";
import {
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { CheckCircle, Cancel, AccountBalanceWallet } from "@mui/icons-material";

const ApprovalPage: React.FC = () => {
  const { data: approvals, isLoading,refetch } = useGetAllApprovalsQuery();
  const [checkBalance] = useCheckBalanceMutation();
  const [updateApproval] = useUpdateApprovalMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBalanceCheck = async (userId: string, txnId: string, approvalId: string) => {
    try {
      setLoadingId(approvalId);
      const response = await checkBalance({ userId, txnId }).unwrap();
      toast[response.success ? "success" : "error"](
        response.success ? "Sufficient balance!" : "Insufficient balance!"
      );
    } catch (error) {
      toast.error("Failed to check balance!");
    } finally {
      setLoadingId(null);
    }
  };

  const handleApprove = async (approvalId: string, txnId: string) => {
    try {
      await updateApproval({ id: approvalId, status: "APPROVED" }).unwrap();
      await updateTransaction({ id: txnId, status: "APPROVED" }).unwrap();
      toast.success("Transaction Approved!");
      refetch();
    } catch (error) {
      toast.error("Failed to approve the transaction!");
    }
  };

  const handleReject = async (approvalId: string, txnId: string) => {
    try {
      await updateApproval({ id: approvalId, status: "REJECTED" }).unwrap();
      await updateTransaction({ id: txnId, status: "REJECTED" }).unwrap();
      toast.success("Transaction Rejected!");
      refetch();
    } catch (error) {
      toast.error("Failed to reject the transaction!");
    }
  };

  if (isLoading) return <Typography variant="h6">Loading approvals...</Typography>;

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          All Approvals
        </Typography>

        {approvals?.data?.length === 0 ? (
          <Typography>No approvals found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Amount (₹)</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>International</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvals?.data?.map((approval) => (
                  <TableRow key={approval._id}>
                    <TableCell>{approval.userId.name}</TableCell>
                    <TableCell>{approval.txnId.amount}</TableCell>
                    <TableCell>{approval.txnId.type}</TableCell>
                    <TableCell>{approval.txnId.isInternational ? "Yes" : "No"}</TableCell>
                    <TableCell style={{ color: approval.status === "APPROVED" ? "green" : approval.status === "REJECTED" ? "red" : "black" }}>
                      {approval.status}
                    </TableCell>
                    <TableCell>{new Date(approval.createdAt).toLocaleDateString()}</TableCell> {/* Display Date */}
                    <TableCell>
                      {approval.status === "PENDING" && (
                        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
                          <IconButton
                            color="success"
                            onClick={() => handleApprove(approval._id, approval.txnId._id)}
                            sx={{ padding: "4px" }}
                          >
                            <CheckCircle style={{ fontSize: 24 }} />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleReject(approval._id, approval.txnId._id)}
                            sx={{ padding: "4px" }}
                          >
                            <Cancel style={{ fontSize: 24 }} />
                          </IconButton>
                          {approval.txnId.type !== "DEPOSIT" && (
                            <IconButton
                              color="primary"
                              onClick={() => handleBalanceCheck(approval.userId._id, approval.txnId._id, approval._id)}
                              disabled={loadingId === approval._id}
                              sx={{ padding: "4px" }}
                            >
                              <AccountBalanceWallet style={{ fontSize: 24 }} />
                            </IconButton>
                          )}
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default ApprovalPage;
