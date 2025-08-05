import dotenv from "dotenv"; // Mengimpor package dotenv untuk membaca file .env
dotenv.config(); // Menjalankan konfigurasi dotenv agar variabel lingkungan bisa digunakan

export const DATABASE_URL: string = process.env.DATABASE_URL || ""; // Mendefinisikan constant DATABASE_URL dari variabel lingkungan, default "" jika tidak ada
export const SECRET: string = process.env.SECRET || ""; // Mendefinisikan constant SECRET dari variabel lingkungan, default "" jika tidak ada
