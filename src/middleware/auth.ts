/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "@/lib/config/config";
import type { Roles } from "@/lib/types/types";
import userService from "@/features/users/user.service";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	const token: string | undefined =
		req.cookies[config.jwt.access_token.cookieName];
	if (!token) {
		return res.sendStatus(httpStatus.UNAUTHORIZED);
	}

	// Verifying jwt
	verify(token, config.jwt.access_token.secret, handleJWTVerify);
	// JWT Handler
	async function handleJWTVerify(err: unknown, payload: JwtPayload) {
		if (err) {
			return res.sendStatus(httpStatus.UNAUTHORIZED);
		}

		req.payload = payload;

		try {
			// In case admin invalidates user password
			// We need to close the user session
			if (payload.userRole === "user") {
				const user = await userService.getUserBy({
					password: payload.password as string,
				});

				if (!user) {
					return res.sendStatus(httpStatus.UNAUTHORIZED);
				}
			}
		} catch (err) {
			return res.sendStatus(httpStatus.UNAUTHORIZED);
		}

		// Call next() only after all checks are done
		return next();
	}
}

const isAuthorized = (...roles: Roles[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const role = req.payload?.userRole as Roles;
		// Checking if roles include the role of the user, thus authorizing the request
		if (!role || !roles.includes(role)) {
			return res.sendStatus(httpStatus.FORBIDDEN);
		}
		next();
	};
};

const createAuthMiddleware = (...roles: Roles[]) => {
	return [isAuthenticated, isAuthorized(...roles)];
};

export default createAuthMiddleware;
