import { Router, RequestHandler } from "express";
import loginController from "../controllers/loginController";

const router = Router();

router.post("/login", loginController.login as RequestHandler);

export default router;
