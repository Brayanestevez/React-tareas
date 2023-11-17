//validaciones desde BACk_END

import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email es requerido", //mensaje, email es requerido, sino lo diiiiitan
    })
    .email({
      message: "email  invalido", //y siu no digitan elemail correcto con el , mensaje invaliod email
    }),
  password: z
    .string({
      required_error: "contraseña es requerida",
    })
    .min(6, {
      message: "es necesario minimo 6 caracteres para la contraseña",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email es requerido",
    })
    .email({
      message: "email es incorrecto " ,
    }),
  password: z
    .string({
      required_error: "contraseña es requerida",
    })
    .min(6, {
      message: "es necesario minimo 6 caracteres para la contraseña",
    }),
});
