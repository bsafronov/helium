import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Имя пользователя должно быть не менее 3 символов",
      })
      .max(64, {
        message: "Слишком длинное имя",
      })
      .trim(),
    password: z.string().min(6, {
      message: "Пароль должен быть не менее 6 символов",
    }),
    rePassword: z.string().min(6, {
      message: "Пароль должен быть не менее 6 символов",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Пароли не совпадают",
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
