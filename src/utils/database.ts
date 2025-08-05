import mongoose from "mongoose"; // Mengimpor mongoose, library ODM untuk MongoDB
import { DATABASE_URL } from "./env"; // Mengimpor variabel DATABASE_URL dari file env.ts

const connect = async () => {
  // Mendefinisikan fungsi async bernama connect
  try {
    // Blok try untuk mencoba koneksi ke database
    await mongoose.connect(DATABASE_URL, {
      // Menghubungkan ke MongoDB dengan URL dari env
      dbName: "db-backend", // Menentukan nama database yang digunakan
    });
    return Promise.resolve("Database connected"); // Jika berhasil, kembalikan pesan sukses
  } catch (error) {
    // Jika gagal, tangkap error-nya
    return Promise.reject(error); // Kembalikan promise yang gagal (error)
  }
};
export default connect; // Mengekspor fungsi connect agar bisa digunakan di file lain
