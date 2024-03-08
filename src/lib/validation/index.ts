import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  username: z.string().min(2, { message: "El nombre de usuario debe tener al menos 2 caracteres" }),
  email: z.string().email({message: 'Email inválido'}),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

export const SigninValidation = z.object({
  email: z.string().email({message: 'Email inválido'}),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(5).max(100),
  tags: z.string(),
});
