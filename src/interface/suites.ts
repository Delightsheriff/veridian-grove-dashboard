import { z } from "zod";

export interface Suite {
  id: string;
  name: string;
  description: string;
  max_guests: number;
  regular_price: number;
  discount: number;
  features: Record<string, boolean>;
  images: string[];
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const suiteSchema = z.object({
  name: z.string().min(1, "Suite name is required"),
  description: z.string().min(1, "Suite description is required"),
  max_guests: z.coerce.number().min(1, "At least 1 guest"),
  regular_price: z.coerce
    .number()
    .min(1, "Regular price must be greater than 0"),
  discount: z.coerce.number().min(0, "Discount cannot be negative").default(0),
  features: z.record(z.string(), z.boolean()),
  images: z.any().optional(),
});

export type SuiteFormValues = z.infer<typeof suiteSchema>;
