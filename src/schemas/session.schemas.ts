import { z } from 'zod';

export const requestLoginSchema = z.object({
  email: z.string().trim().max(45).email(),
  password: z.string().trim().max(120).min(4),
});
