import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom est requis avec un minimum de 3 caractères"),
  email: z.email("L'email doit être valide"),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir minimu 8 caractères" })
    .regex(/^(?=.*[A-Z]).{8,}$/, {
      message:
        "Doit contenir au moins une lettre majuscule et avoir une longueur minimale de 8 caractères.",
    }),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
