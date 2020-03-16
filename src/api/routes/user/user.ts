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

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(201).json({
        message: "user not found"
      });
    }
    const valid = await bcrypt.compare(req.body.password, user!.password);
    if (!valid) {
      res.status(201).json({
        message: "password wrong"
      });
    }
    req.session!.userId = user!.id;
    res.status(201).json({
      statusCode: "201",
      message: "Login Successed"
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(201).json({
        message: "user not found"
      });
    }
    const valid = await bcrypt.compare(req.body.password, user!.password);
    if (!valid) {
      res.status(201).json({
        message: "password wrong"
      });
    }
    req.session!.userId = user!.id;
    res.status(201).json({
      statusCode: "201",
      message: "Login Successed"
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
