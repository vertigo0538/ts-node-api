import { Router, Request, Response, NextFunction } from "express";
import { isAuth } from "../../../middleware/isAuth";
import { User } from "../../../entity/User";

const router = Router();

router.get(
  "/products",
  isAuth,
  (req: Request, res: Response, next: NextFunction) => {
    res.send("hello");
  }
);

router.get(
  "/me",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne(req.session!.userId);
    // console.log(req.session!.id);
    res.status(200).json({
      message: "hi",
      user
    });
    // console.log(user);
  }
);
export default router;
