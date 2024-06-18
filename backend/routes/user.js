import { Router } from "express";
import zod from "zod";

import { User, Account, Transaction } from "../database/Schema.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
  if (!req.userId || !req.name) {
    return res.status(400).json({ error: "User not found" });
  }
  const { balance } = await Account.findOne({ userId: req.userId });
  res.status(200).json({ name: req.name, balance });
});

router.get("/users/bulk", isAuthenticated, async (req, res) => {
  const filter = req.query.filter ?? "";
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

//send user transaction history containing sent and received transactions
router.get("/transactions", isAuthenticated, async (req, res) => {
  const transactions = await Transaction.find({
    $or: [{ from: req.userId }, { to: req.userId }],
  });
  const idToName = {};
  const sent = [],
    received = [];
  for (const transaction of transactions) {
    if (transaction.from == req.userId) {
      if (!idToName[transaction.to]) {
        const { firstName, lastName } = await User.findById(transaction.to, {
          firstName: 1,
          lastName: 1,
        });
        idToName[transaction.to] = `${firstName} ${lastName}`;
      }
      sent.push({
        to: idToName[transaction.to],
        amount: transaction.amount,
        date: transaction.date,
        txid: transaction._id,
      });
    } else if (transaction.to == req.userId) {
      if (!idToName[transaction.from]) {
        const { firstName, lastName } = await User.findById(transaction.from, {
          firstName: 1,
          lastName: 1,
        });
        idToName[transaction.from] = `${firstName} ${lastName}`;
      }
      received.push({
        from: idToName[transaction.from],
        amount: transaction.amount,
        date: transaction.date,
        txid: transaction._id,
      });
    }
  }
  res.status(200).json({ sent, received });
});

router.post("/transfer", isAuthenticated, async (req, res) => {
  console.log("Transfer initiated", req.query);
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
