import { Router } from "express";
import zod from "zod";

import { User, Account, Transaction } from "../database/Schema.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
  const { balance } = await Account.findOne({ userId: req.userId });
  res.status(200).json({ name: req.name, balance });
});

router.get("/users/bulk", isAuthenticated, async (req, res) => {
  const filter = req.query.filter ?? "";
  console.log(filter);
  const users = await User.find(
    {
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
      _id: { $ne: req.userId },
    },
    { firstName: 1, lastName: 1, _id: 1 }
  );
  res.status(200).json({ users });
});

router.post("/transfer", isAuthenticated, async (req, res) => {
  console.log(req.query);
  try {
    const from = req.userId;
    const to = zod.string().parse(req.query.to);
    const amount = zod.number().positive().parse(parseInt(req.query.amount));
    const { balance } = await Account.findOne({ userId: from });
    if (balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    await Account.updateOne({ userId: from }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
    const { _id: txid } = await Transaction.create({
      from,
      to,
      amount,
      date: new Date(),
    });
    return res.status(200).json({ message: "Transfer successful", txid });
  } catch (error) {
    console.log("Transfer failed", error);
    return res
      .status(400)
      .json({ error: "Provide proper fields for transfer" });
  }
});

router.use((error, req, res, next) => {
  console.log("Error in user route", error);
  res.status(500).json({ error: "Server Error" });
});

export default router;
