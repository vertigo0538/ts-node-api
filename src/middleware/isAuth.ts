import { Request, Response, NextFunction } from "express";
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session!.userId) {
    // throw new Error("로그인 해주세요.");
    res.json({
      message: "로그인해주세요"
    });
  }
  return next();
};
