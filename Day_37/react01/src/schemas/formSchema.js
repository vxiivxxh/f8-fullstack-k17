import * as z from "zod";

export const contactInfoSchema = z.object({
  firstName: z.string().trim().min(1, "Vui lòng nhập Tên"),
  lastName: z.string().trim().min(1, "Vui lòng nhập Họ"),
  email: z
    .string()
    .min(1, "Vui lòng nhập Email")
    .email("Email không đúng định dạng"),
  age: z.coerce
    .number({
      invalid_type_error: "Tuổi phải là số",
    })
    .min(1, "Vui lòng nhập Tuổi"),
});

export const usernameSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập Tên đăng nhập").trim(),
});

export const asyncSchema = z.object({});

export const combinedSchema = z
  .object({
    ...contactInfoSchema.shape,
    ...usernameSchema.shape,
    ...asyncSchema.shape,
  })
  .superRefine((data, ctx) => {
    if (
      data.username &&
      data.firstName &&
      !data.username.includes(data.firstName)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Tên đăng nhập phải chứa họ của bạn (${data.firstName})`,
        path: ["username"],
      });
    }
  });
