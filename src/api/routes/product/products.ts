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
    try {
      const user = await User.findOne(req.session!.userId);
      console.log(user);
      return res.status(200).json({
        message: "hi",
        user,
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
);
export default router;
