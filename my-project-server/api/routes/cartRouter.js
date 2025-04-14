const express = require("express");
const router = express.Router();
const Carts = require('../models/Carts');

const cartController = require("../controllers/cartControllers");
const verifyToken = require("../middleware/verifyToken"); // Jika ingin pakai autentikasi

router.get("/", cartController.getCartByEmail);
router.post("/",  cartController.addToCart);
router.put("/:id",  cartController.updateCart);
router.delete("/:id",  cartController.deleteCart);
router.get("/:id",  cartController.getSingleCart);
router.delete("/clear/:email",  cartController.clearCartByEmail);

module.exports = router;
