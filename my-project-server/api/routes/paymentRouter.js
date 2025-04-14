const express = require("express");
const router = express.Router();
const { 
  createPayment, 
  handleMidtransNotification, 
  saveCustomerEmail, getAllTransactions
} = require("../controllers/paymentControllers");

router.post("/checkout", createPayment);
router.post("/notification", handleMidtransNotification);
router.post("/save-email", saveCustomerEmail); // Add this route
router.get("/transactions", getAllTransactions);

module.exports = router;
