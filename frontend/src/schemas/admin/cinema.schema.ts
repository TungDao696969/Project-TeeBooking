import { z } from "zod";

export const cinemaSchema = z.object({
  name: z.string().min(3, "Tên rạp tối thiểu 3 ký tự"),

  hotline: z.string().min(10, "Hotline không hợp lệ"),

  cityId: z.string().uuid("Chọn thành phố"),

  province: z.string().min(1, "Chọn tỉnh"),

  district: z.string().min(1, "Chọn quận huyện"),

  ward: z.string().min(1, "Chọn phường xã"),

  address: z.string().min(5, "Địa chỉ tối thiểu 5 ký tự"),

  latitude: z.coerce.number(),
  longitude: z.coerce.number(),

  openingHours: z.string().min(1, "Nhập giờ mở cửa"),
});

export type CinemaFormInput = z.input<typeof cinemaSchema>;

export type CinemaFormValues = z.infer<typeof cinemaSchema>;
