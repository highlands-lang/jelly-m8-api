import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "@/lib/config/config";

export const validateApiKey = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.path.includes("/auth")) {
		return next();
	}
	const apiKey = req.signedCookies[config.api.cookie_name];
	if (apiKey !== config.api.key) {
		return res
			.status(httpStatus.FORBIDDEN)
			.json({ message: "You must obtain the API key." });
	}
	next();
};
