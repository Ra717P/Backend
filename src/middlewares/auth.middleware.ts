import { NextFunction, Request, Response } from "express";
import { IUserToken } from "../utils/jwt";

export interface IReqUser extends Request {
  user?: IUserToken;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header?.authorization;

  if (!authorization) {
    return res.status(403).json({
      massage: "unauthorization",
      data: null,
    });
  }
  const [prefix, accesToken] = authorization.split(" ");
};
