const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const dotenv   = require("dotenv");
 
dotenv.config();
 
const app = express();
 
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
 
// ── Routes ────────────────────────────────────────────────────────────────────
const { mfRouter, fdRouter, liquidRouter } = require("./routes/portfolio");

app.use("/api/expenses",    require("./routes/expenses"));
app.use("/api/stocks",      require("./routes/stocks"));
app.use("/api/mutualfunds", mfRouter);
app.use("/api/fds",         fdRouter);
app.use("/api/liquid",      liquidRouter);
app.use("/api/summary",     require("./routes/summary"));
 
// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok", ts: new Date() }));
 
// ── DB + Server ───────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, { dbName: "finflow" })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅  FinFlow API running on port ${PORT}`));
  })
  .catch(err => { console.error("❌  MongoDB connection failed:", err); process.exit(1); });
 
module.exports = app;