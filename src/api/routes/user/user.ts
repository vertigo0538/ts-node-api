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
      password: hashedPassword,
    }).save();

    res.status(201).json({
      statusCode: "201",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "아이디를 확인 할 수 없습니다.",
      });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        message: "패스워드를 확인 해주세요",
      });
    }
    req.session!.userId = user.id;
    return res.status(201).json({
      statusCode: "201",
      message: "Login Successed",
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  new Promise((resol, rej) =>
    req.session!.destroy((err) => {
      if (err) {
        console.log(err);
        rej(false);
      }
      res.clearCookie("qid");
      res.json({
        message: "bye",
      });

      resol(true);
    })
  );
});

export default router;
