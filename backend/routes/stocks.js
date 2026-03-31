const router = require("express").Router();
const { Stock } = require("../models");
const USER = "demo_user";
 
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: USER }).sort({ ticker: 1 });
    res.json(stocks);
  } catch (e) { res.status(500).json({ error: e.message }); }
});
 
router.post("/", async (req, res) => {
  try {
    const stock = await Stock.create({ ...req.body, userId: USER });
    res.status(201).json(stock);
  } catch (e) { res.status(400).json({ error: e.message }); }
});
 
router.put("/:id", async (req, res) => {
  try {
    const stock = await Stock.findOneAndUpdate(
      { _id: req.params.id, userId: USER }, req.body,
      { new: true, runValidators: true }
    );
    if (!stock) return res.status(404).json({ error: "Not found" });
    res.json(stock);
  } catch (e) { res.status(400).json({ error: e.message }); }
});
 
// PATCH /api/stocks/:id/cmp  — update live price
router.patch("/:id/cmp", async (req, res) => {
  try {
    const { cmp } = req.body;
    const stock = await Stock.findOneAndUpdate(
      { _id: req.params.id, userId: USER },
      { cmp },
      { new: true }
    );
    res.json(stock);
  } catch (e) { res.status(400).json({ error: e.message }); }
});
 
router.delete("/:id", async (req, res) => {
  try {
    await Stock.findOneAndDelete({ _id: req.params.id, userId: USER });
    res.json({ message: "Deleted" });
  } catch (e) { res.status(500).json({ error: e.message }); }
});
 
// GET /api/stocks/pl  — P&L summary per holding
router.get("/pl", async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: USER });
    const pl = stocks.map(s => ({
      ticker:         s.ticker,
      qty:            s.qty,
      avgPrice:       s.avgPrice,
      cmp:            s.cmp,
      investedValue:  s.investedValue,
      currentValue:   s.currentValue,
      pl:             s.pl,
      plPct:          s.plPct,
    }));
    const totalInvested = pl.reduce((a, b) => a + b.investedValue, 0);
    const totalCurrent  = pl.reduce((a, b) => a + b.currentValue,  0);
    res.json({ holdings: pl, totalInvested, totalCurrent, totalPL: totalCurrent - totalInvested });
  } catch (e) { res.status(500).json({ error: e.message }); }
});
 
module.exports = router;