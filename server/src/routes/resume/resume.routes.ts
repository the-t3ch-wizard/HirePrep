import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { resume } from "../../controllers/resume.controller";

const resumeRoutes = Router();

resumeRoutes.post("/extract-and-create", asyncHandler(resume.extractAndCreateResume))

export default resumeRoutes;
