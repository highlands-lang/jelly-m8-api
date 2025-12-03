import { Router } from "express";
// import { loginSchema } from '../../validations/auth.validation';
import * as authController from "./auth.controller";
import { validateRequest } from "@/middleware/validate";
import { userLoginSchema } from "./login.schema";
import createAuthMiddleware from "@/middleware/auth";
import { z } from "zod";

const authRouter: Router = Router();

authRouter.get("/auth/api/status", authController.handleStatus);

authRouter.post(
	"/auth/login",
	validateRequest({ body: userLoginSchema }),
	authController.handleLogin,
);

authRouter.post(
	"/auth/logout",
	createAuthMiddleware("admin", "user"),
	authController.handleLogout,
);

authRouter.post(
	"/auth/api/login",
	validateRequest({
		body: z.object({
			apiKey: z.string().max(255),
		}),
	}),
	authController.handleApiLogin,
);

export default authRouter;
