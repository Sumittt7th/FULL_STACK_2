import React, { useState } from "react";
import { useGetAllCommissionsQuery } from "../../services/commisions.api"; // Importing the query for commissions
import {
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

const CommissionsPage: React.FC = () => {
  const { data: commissions, isLoading, refetch } = useGetAllCommissionsQuery();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (isLoading) return <Typography variant="h6">Loading commissions...</Typography>;

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          All Commissions
        </Typography>

        {commissions?.data?.length === 0 ? (
          <Typography>No commissions found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Amount (₹)</strong></TableCell>
                  <TableCell><strong>International</strong></TableCell>
                  <TableCell><strong>Commission Amount</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commissions?.data?.map((commission) => (
                  <TableRow key={commission._id}>
                    <TableCell>{commission.userId?.name}</TableCell>
                    <TableCell>{commission.txnId?.amount}</TableCell>
                    <TableCell>{commission.txnId?.isInternational ? "Yes" : "No"}</TableCell>
                    <TableCell>{commission.commissionAmount}</TableCell>
                    <TableCell>{new Date(commission.createdAt).toLocaleDateString()}</TableCell> {/* Display Date */}
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

export default CommissionsPage;
