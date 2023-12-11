import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", (req, res) => {
  res.clearCookie("access_token"); // Limpa o cookie
  res.status(200).json({ message: "Logout bem-sucedido" });
});

export default router;