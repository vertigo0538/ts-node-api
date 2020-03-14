import { Router, Request, Response } from "express";
import { User } from "../../../entity/User";
import bcrypt from "bcryptjs";

const router = Router();

// register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    }).save();

    res.status(201).json({
      statusCode: "201",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
