import { z } from "zod";

const cabinSchema = z.object({
  name: z
    .string({ message: "Cabin name is required" })
    .trim()
    .min(3, { message: "Cabin name must contain at least 3 characters" })
    .max(30, { message: "Cabin name must contain at most 30 characters" }),
  maxCapacity: z
    .number({
      message: "Max capacity is required",
    })
    .gte(1, { message: "Max capacity must be greater than or equal to 1" }),
  regularPrice: z
    .number({
      message: "Regular price is required",
    })
    .positive({ message: "Regular price must be greater than 0" }),
  discount: z
    .number({
      message: "Discount is required",
    })
    .gte(0, { message: "Discount must be greater than or equal to 0" }),
  description: z
    .string({
      message: "Description is required",
    })
    .trim()
    .min(20, { message: "Description must contain at least 20 characters" })
    .max(1000, {
      message: "Description must contain at most 1000 characters",
    }),
  image: z.custom((val) => val instanceof File, {
    message: "Cabin photo is required",
  }),
});

const validateDiscount = (data) => data.regularPrice > data.discount;

export const createCabinSchema = cabinSchema.refine(validateDiscount, {
  message: "Discount must be less than regular price",
  path: ["discount"],
});

export const updateCabinSchema = cabinSchema
  .extend({
    image: z
      .string({ message: "Cabin photo is required" })
      .or(cabinSchema.shape.image),
  })
  .refine(validateDiscount, {
    message: "Discount must be less than regular price",
    path: ["discount"],
  });
