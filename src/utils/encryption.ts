import crypto from "crypto"; // Mengimpor modul crypto bawaan Node.js untuk kebutuhan enkripsi
import { SECRET } from "./env"; // Mengimpor nilai SECRET dari file env.ts sebagai salt

export const encrypt = (password: string): string => {
  // Mendefinisikan fungsi encrypt yang menerima password dan mengembalikan string
  const encrypted = crypto // Menggunakan modul crypto
    .pbkdf2Sync(password, SECRET, 1000, 64, "sha512") // Mengenkripsi password dengan algoritma PBKDF2 menggunakan salt SECRET
    .toString("hex"); // Mengubah hasil enkripsi ke dalam format heksadesimal
  return encrypted; // Mengembalikan password yang telah dienkripsi
};
