import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { 
  Container, TextField, Button, Typography, Paper, MenuItem, useTheme 
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCreateTransactionMutation } from "../../services/transaction.api";
import { useCreateApprovalMutation } from "../../services/approval.api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { pageAnimation, textAnimation, formVariants, inputVariants, buttonVariants } from "../../animation";

const schema = yup.object({
  amount: yup.number().required("Amount is required").positive("Amount must be positive"),
  type: yup.string().oneOf(["DEPOSIT", "TRANSFER", "WITHDRAWAL"]).required("Transaction type is required"),
  isInternational: yup.boolean().required("International status is required"),
});

interface ITransactionForm {
  amount: number;
  type: "DEPOSIT" | "TRANSFER" | "WITHDRAWAL";
  isInternational: boolean;
  commissionAmount: number;
  receiverId?: string | null;
}

const TransactionForm: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { _id: userId } = useSelector((state: RootState) => state.auth.user);
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();
  const [createApproval] = useCreateApprovalMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITransactionForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ITransactionForm> = async (data) => {
    try {
      const transactionData = {
        userId,
        receiverId: data.receiverId || null,
        amount: data.amount,
        type: data.type,
        status: "PENDING",
        isInternational: data.isInternational,
        commissionAmount: data.commissionAmount,
      };

      const createdTransaction = await createTransaction(transactionData).unwrap();
      toast.success("Transaction created successfully!");

      const approvalData = {
        txnId: createdTransaction.data._id,
        userId: userId,
        status: 'PENDING',
      };

      await createApproval(approvalData).unwrap();
      toast.success("Approval created successfully!");
      reset();

    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to create transaction or approval. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div variants={pageAnimation} initial="hidden" animate="show" exit="exit">
      <Container>
        <Paper 
          elevation={3} 
          sx={{ 
            textAlign: "center", 
            padding: 3, 
            backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
            color: isDarkMode ? "#fff" : "#000"
          }}
        >
          <motion.div variants={textAnimation}>
            <Typography variant="h4" gutterBottom>
              Create Transaction
            </Typography>
          </motion.div>

          <motion.form 
            variants={formVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            onSubmit={handleSubmit(onSubmit)}
          >
            <motion.div variants={inputVariants}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
                {...register("amount")}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                sx={{
                  input: { color: isDarkMode ? "#fff" : "#000" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: isDarkMode ? "#333" : "#fff",
                    "& fieldset": { borderColor: isDarkMode ? "#777" : "#ccc" },
                    "&:hover fieldset": { borderColor: isDarkMode ? "#bbb" : "#333" },
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                  },
                  "& .MuiFormLabel-root": {
                    color: isDarkMode ? "#bbb" : "#666",
                    "&.Mui-focused": { color: "#1976D2" },
                  },
                }}
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <TextField
                label="Transaction Type"
                select
                fullWidth
                variant="outlined"
                margin="normal"
                {...register("type")}
                error={!!errors.type}
                helperText={errors.type?.message}
                sx={{
                  backgroundColor: isDarkMode ? "#333" : "#fff",
                  "& .MuiInputBase-root": {
                    color: isDarkMode ? "#fff" : "#000",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: isDarkMode ? "#777" : "#ccc" },
                    "&:hover fieldset": { borderColor: isDarkMode ? "#bbb" : "#333" },
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                  },
                }}
              >
                <MenuItem value="DEPOSIT">Deposit</MenuItem>
                <MenuItem value="TRANSFER">Transfer</MenuItem>
                <MenuItem value="WITHDRAWAL">Withdrawal</MenuItem>
              </TextField>
            </motion.div>

            <motion.div variants={inputVariants}>
              <TextField
                label="Receiver ID (Optional)"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                {...register("receiverId")}
                error={!!errors.receiverId}
                helperText={errors.receiverId?.message}
                sx={{
                  input: { color: isDarkMode ? "#fff" : "#000" },
                  backgroundColor: isDarkMode ? "#333" : "#fff",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: isDarkMode ? "#777" : "#ccc" },
                    "&:hover fieldset": { borderColor: isDarkMode ? "#bbb" : "#333" },
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                  },
                }}
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <TextField
                label="Is International?"
                select
                fullWidth
                variant="outlined"
                margin="normal"
                {...register("isInternational")}
                error={!!errors.isInternational}
                helperText={errors.isInternational?.message}
                sx={{
                  backgroundColor: isDarkMode ? "#333" : "#fff",
                  "& .MuiInputBase-root": {
                    color: isDarkMode ? "#fff" : "#000",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: isDarkMode ? "#777" : "#ccc" },
                    "&:hover fieldset": { borderColor: isDarkMode ? "#bbb" : "#333" },
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                  },
                }}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </TextField>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                disabled={isLoading} 
                sx={{ mt: 2 }}
              >
                {isLoading ? "Creating Transaction..." : "Create Transaction"}
              </Button>
            </motion.div>
          </motion.form>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default TransactionForm;
