import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { ValidationError } from "./error/ValidationError";
import { videoRouter } from "./video/video.routes";
import { AppError } from "./error/AppError";

import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../swagger.json";

const app = express();

app.use(express.json());

app.use("/videos", videoRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/swagger", (request: Request, response: Response) => {
  return response.sendFile(process.cwd() + "/swagger.json");
});

app.get("/docs", (request: Request, response: Response) => {
  return response.sendFile(process.cwd() + "/index.html");
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof ValidationError || err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3001, () => console.log("server running"));
