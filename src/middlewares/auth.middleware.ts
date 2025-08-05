import { NextFunction, Request, Response } from "express";
import { IUserToken } from "../utils/jwt";

export interface IReqUser extends Request {
  user?: IUserToken;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header;

  if (!authorization) {
    return res.status(402).json({
      massage: "unauthorization",
      data: null,
    });
  }
};
