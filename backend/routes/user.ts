import { NextFunction, Request, Response, Router } from "express";
import zod from "zod";

//importing prisma client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { AuthRequest } from "../middlewares/types";

const router = Router();

router.get("/", isAuthenticated, async (req: AuthRequest, res) => {
  if (!req.userId || !req.name) {
    return res.status(400).json({ error: "User not found" });
  }
  const user = await prisma.accounts.findFirst({
    where: {
      userId: req.userId,
    },
  });
  res.status(200).json({ name: req.name, balance: user?.balance });
});

router.get("/users/bulk", isAuthenticated, async (req: AuthRequest, res) => {
  const filter = req.query.filter ?? "";
  const users = await prisma.users.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: filter.toString(),
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: filter.toString(),
            mode: "insensitive",
          },
        },
      ],
      NOT: {
        id: req.userId,
      },
    },
    select: {
      firstName: true,
      lastName: true,
      id: true,
    },
  });
  res.status(200).json({ users });
});

//Get all transactions where the user is either the sender or the receiver
//The logic is to map each userId to name from users table and store transactions including those names individually on sent and received arrays
router.get("/transactions", isAuthenticated, async (req: AuthRequest, res) => {
  //find all transactions where req.userId(current user) is present
  const transactions = await prisma.transactions.findMany({
    where: {
      OR: [{ from: req.userId }, { to: req.userId }],
    },
  });
  //Map userId to name
  const idToName: { [key: string]: string } = {};
  const sent = [],
    received = [];

  for (const transaction of transactions) {
    //check if the transaction is sent by the current user
    if (transaction.from == req.userId) {
      //check if the id is already mapped to name if not then query db and map it
      if (!idToName[transaction.to]) {
        const { firstName, lastName } = (await prisma.users.findFirst({
          where: {
            id: transaction.to,
          },
          select: {
            firstName: true,
            lastName: true,
          },
        })) ?? { firstName: "Unknown", lastName: "User" };
        idToName[transaction.to] = `${firstName} ${lastName}`;
      }
      //finally push the transaction to sent array
      sent.push({
        to: idToName[transaction.to.toString()],
        amount: transaction.amount,
        date: transaction.date,
        txid: transaction.id,
      });
    }
    //check if the transaction is received by the current user
    else if (transaction.to == req.userId) {
      //check if the id is already mapped to name if not then query db and map it
      if (!idToName[transaction.from]) {
        const { firstName, lastName } = (await prisma.users.findFirst({
          where: {
            id: transaction.from,
          },
          select: {
            firstName: true,
            lastName: true,
          },
        })) ?? { firstName: "Unknown", lastName: "User" };
        idToName[transaction.from] = `${firstName} ${lastName}`;
      }
      //finally push the transaction to received array
      received.push({
        from: idToName[transaction.from.toString()],
        amount: transaction.amount,
        date: transaction.date,
        txid: transaction.id,
      });
    }
  }
  res.status(200).json({ sent, received });
});

router.post("/transfer", isAuthenticated, async (req: AuthRequest, res) => {
  console.log("Transfer initiated", req.query);
  try {
    const from = zod.string().parse(req.userId);
    const to = zod.string().parse(req.query.to);
    const amount = zod
      .number()
      .positive()
      .parse(parseInt(req.query.amount as string));
    const fromUser = await prisma.accounts.findFirst({
      where: {
        userId: from,
      },
    });
    if (!fromUser || fromUser.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    await prisma.accounts.update({
      where: { userId: from },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
    await prisma.accounts.update({
      where: { userId: to },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
    const txid = await prisma.transactions.create({
      data: {
        from,
        to,
        amount,
        date: new Date(),
      },
      select: {
        id: true,
      },
    });
    return res.status(200).json({ message: "Transfer successful", txid });
  } catch (error) {
    console.log("Transfer failed", error);
    return res
      .status(400)
      .json({ error: "Provide proper fields for transfer" });
  }
});

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error in user route", error);
  res.status(500).json({ error: "Server Error" });
});

export default router;
