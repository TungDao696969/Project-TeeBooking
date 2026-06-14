import api from "@/lib/axios";
import { AdminBookingResponse, AdminBookingDetailResponse, BookingStatus } from "@/types/admin/booking.type";

interface GetBookingsParams {
  page: number;
  limit: number;
  search?: string;
  status?: BookingStatus;
}

export const getAdminBookings = async (
  params: GetBookingsParams
): Promise<AdminBookingResponse> => {
  const { data } = await api.get("/admin/booking", { params });
  return data;
};

export const getAdminBookingById = async (
  id: string
): Promise<AdminBookingDetailResponse> => {
  const { data } = await api.get(`/admin/booking/${id}`);
  return data;
};

export const updateAdminBookingStatus = async (
  id: string,
  status: BookingStatus
): Promise<{ success: boolean; message: string }> => {
  const { data } = await api.patch(`/admin/booking/${id}/status`, { status });
  return data;
};

export const adminCancelBooking = async (
  id: string,
  refund: boolean
): Promise<{ success: boolean; message: string }> => {
  const { data } = await api.post(`/admin/booking/${id}/cancel`, { refund });
  return data;
};

