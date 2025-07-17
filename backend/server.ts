import express from "express";
import cors from "cors";
import { encryptValue, initFheInstance } from "./fhevm";

const app = express();
const PORT = 3001;

// ✅ Разрешить CORS
app.use(cors());
app.use(express.json());

// ✅ POST /encrypt
app.post("/encrypt", (req, res) => {
  try {
    const { a, b } = req.body;
    console.log("🔢 Получены значения:", a, b);
    const encA = encryptValue(Number(a));
    const encB = encryptValue(Number(b));
    console.log("🔐 Зашифровано:", encA, encB);
    res.json({ encA, encB });
  } catch (error) {
    console.error("❌ Ошибка шифрования:", error);
    res.status(500).json({ error: "Encryption failed" });
  }
});

// ✅ Инициализация и запуск
initFheInstance().then(() => {
  console.log("🔐 FHE Instance инициализирован");
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Backend listening at http://0.0.0.0:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Ошибка при инициализации FHE:", err);
});
