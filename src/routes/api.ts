// Mengimpor modul express dari package 'express'
import express from "express";

// Mengimpor authController yang berisi fungsi register dan login dari folder controllers
import authController from "../controllers/auth.controller";

import authMiddleware from "../middlewares/auth.middleware";

// Membuat instance Router dari Express untuk mendefinisikan rute secara modular
const router = express.Router();

// Rute POST untuk registrasi pengguna baru
// Ketika endpoint /auth/register dipanggil dengan method POST,
// maka fungsi register dari authController akan dijalankan
router.post("/auth/register", authController.register);

// Rute POST untuk login pengguna
// Ketika endpoint /auth/login dipanggil dengan method POST,
// maka fungsi login dari authController akan dijalankan
router.post("/auth/login", authController.login);

router.get("/auth/me", authController.me);

// Mengekspor router agar bisa digunakan di file lain seperti app.ts atau index.ts
// Misalnya digunakan dengan app.use("/api", authRoutes) di file utama
export default router;
