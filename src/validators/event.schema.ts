import z from "zod";

export const CreateEventSchema = z.object({
  title: z.string(),
  description: z.string().nullable().default(null),
  location: z.string(),
  date: z.iso.datetime(),
  id_user: z.number(),
});

export const UpdateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
