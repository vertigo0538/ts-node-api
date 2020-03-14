import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = "Resource not found";

  if (response.status(404))
    response.json({
      error: {
        message
      }
    });
};
