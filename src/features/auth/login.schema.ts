import z from "zod";

export const userLoginSchema = z.object({
	password: z.string(),
});
export type UserLoginPayload = z.infer<typeof userLoginSchema>;
