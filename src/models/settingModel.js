import { z } from "zod";

export const settingSchema = z
  .object({
    minBookingLength: z
      .number({ message: "Minimum nights is required" })
      .positive({ message: "Minimum nights must be greater than 0" }),
    maxBookingLength: z
      .number({
        message: "Maximum nights is required",
      })
      .gt(1, { message: "Maximum nights must be greater than 1" })
      .lte(90, {
        message: "Maximum nights must be less than or equal to 90",
      }),
    maxGuestPerBooking: z
      .number({
        message: "Maximum guests is required",
      })
      .positive({ message: "Maximum guests must be greater than 0" })
      .lte(8, {
        message: "Maximum guests must be less than or equal to 8",
      }),
    breakfastPrice: z
      .number({
        message: "Breakfast price is required",
      })
      .positive({ message: "Breakfast price must be greater than 0" }),
  })
  .refine((data) => data.maxBookingLength > data.minBookingLength, {
    message: "Maximum nights must be greater than minimum nights",
    path: ["maxBookingLength"],
  });
