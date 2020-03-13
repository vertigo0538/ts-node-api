import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/users", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Handling GET requests to /users"
  });
});

router.post("/users", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Handling post requests to /users"
  });
});

router.get(
  "/users/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId;
    if (id === "special") {
      res.status(200).json({
        message: "You discovered the special Id",
        id: id
      });
    } else {
      res.status(200).json({
        message: "You passed an Id"
      });
    }
  }
);

router.patch(
  "/users/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "Updated!"
    });
  }
);

router.delete(
  "/users/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "delete"
    });
  }
);
export default router;
