// File: routes/contactRoutes.js (or similar)
import express from "express";
import {
  submitContactForm,
  getAllMessages,
  deleteMessage
} from "../controllers/Contact.js";

const router = express.Router();

router.post("/", submitContactForm);
router.get("/", getAllMessages);
router.delete("/:id", deleteMessage); // 👈 Add this

export default router;
