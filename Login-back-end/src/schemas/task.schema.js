import { z } from "zod";

export const crateTaskSchema = z.object({
    title: z.string({
        required_error: 'title is required'
    }),
    description: z.string({
        required_error: 'description not is necesary'
    }).optional(),//opcional, ya que no es requerido, solo si se quiere
date:  z.string().datetime().optional(),
});