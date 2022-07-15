import { ensureAuthenticated } from "../middleware/auth";
import { VideoController } from "./video.controller";

const { Router } = require("express");

const videoRouter = Router();

const videoController = new VideoController();

videoRouter.get("/:id", videoController.findById);

videoRouter.get("/", ensureAuthenticated, videoController.list);

videoRouter.post("/", videoController.create);

export { videoRouter };
