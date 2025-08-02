import { Request, Response } from "express";

export default {
  dummy(req: Request, res: Response) {
    console.log("Endpoint /api/dummy was hit");
    res.status(200).json({
      message: "Success hit endpoint/dummy - hasil ubahan",
      data: "OK",
    });
  },
};
