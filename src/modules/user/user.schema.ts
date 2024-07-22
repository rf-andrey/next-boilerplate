import { z } from "zod";

const userCore = {
  email: z.string().email(),
  name: z.string(),
};

const userSchema = z.object({
  ...userCore,
  password: z.string(),
});

const userResponseSchema = z.object({
  ...userCore,
  id: z.number(),
});

export type UserInput = z.infer<typeof userSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
