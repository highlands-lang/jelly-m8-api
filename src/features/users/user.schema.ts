import z from "zod";
import type { UserSelect } from "@/database/schema";

interface CreateUserSchema extends Omit<UserSelect, "id" | "password"> {}

export const createUserSchema: z.ZodType<CreateUserSchema> = z.object({
  password: z.string().optional(),
  username: z
    .string()
    .trim()
    .min(3)
    .transform((v) => v.toLowerCase()),
  userRole: z.enum(["admin", "user"]),
});

export interface CreateUserPayload extends z.infer<typeof createUserSchema> {
  password?: string;
}
